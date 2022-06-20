class CraneActor {
    setup() { // Start With Logic
        this.pointA = [-1.4447057496318962, -5.504611090090481, 29.225081241195];
        this.pointB = [-1.4447057496318962, -5.504611090090481, -6.8406291023593755];
        this.subscribe("crane", "updatePositionBy", "updatePositionBy");
        if (this.ratio === undefined) this.ratio = 0.2;
        this.updatePositionBy(0);
        
        this.createCard({ // Create Base
            name: "craneBase",
            translation: [0, -4.6239610018586506, 0],
            scale: [0.9, 0.9, 0.9],
            parent: this,
            modelType: "glb",
            dataLocation: "35H7xJVLhQNFxNMt5HZigey3PXGNeREIgL3fy_PNJaOsXUFBRUYPGhpTXFlQRhtARhtWR1pEQFBBG1xaGkAadm19f1NxelhAfFNccGxaWntsQmVjTHpXXgVTBxpWWlgbUE1UWEVZUBtBR1BDWkcbWExYXFZHWkNQR0ZQGmABZQcHckV0cnJDXlRReGB3B3JMam0DeUwEGGENWgNhZAxaB1NgWUB0B2waUVRBVBpDQGJqeEV7ZmNQc2JZAWIHAndQVEZ8fURQY0NlBmp_UAd-DH9FZXRXUkRC",
            behaviorModules: ["Rapier", "CraneLink"],
            craneHandlesEvent: true,
            noSave: true,
            type: "3d",
        });

        let d = 5; // Amount of Links (+1)
        this.removeObjects();

        this.links = [...Array(d).keys()].map((i) => {

            let bodyDesc;
            if (i === 0) { bodyDesc = Worldcore.RAPIER.RigidBodyDesc.newKinematicPositionBased(); }
            else { bodyDesc = Worldcore.RAPIER.RigidBodyDesc.newDynamic(); }

            let card;
            let translation = [0, 33.860389925172704 - i * 2, 0]; // 13.5
            let name = `link${i}`;
            let cd;

            if (i === d - 1) {
                card = this.createCard({
                    name: "craneHook",
                    translation,
                    dataTranslation: [0, -45, 0],
                    scale: [0.8, 0.8, 0.8],
                    parent: this,
                    type: "3d",
                    modelType: "glb",
                    dataLocation: "3DXL69tRPG3TIGu1pGwQ8THC_ykY41jJOqMYGH8DInacLDAwNDd-a2siLSghN2oxN2onNis1MSEwai0razFrBxwMDiIACykxDSItAR0rKwodMxQSPQsmL3QidmsnKylqITwlKTQoIWowNiEyKzZqKT0pLSc2KzIhNjchayJ3HnYwcQcnCgp0cCAcJQtpFC0lAHEVHAI-MBEdLSUWciYrDRN2aRMhFR1rICUwJWssaSMcDXI1DgcdITMuHH0cLi0WdxRzKwk8KXB1MgkdKyEgLBR3cjUsdDcd",
                    behaviorModules: ["Rapier", "CraneLink"],
                    craneHandlesEvent: true,
                    craneProto: true,
                    noSave: true,
                });
                card.call("Rapier$RapierActor", "createRigidBody", bodyDesc);
                cd = Worldcore.RAPIER.ColliderDesc.ball(0.85);
            } 

            else {
                card = this.createCard({
                    name, // Link0, Link1 ... Link8
                    translation,
                    type: "object",
                    parent: this,
                    behaviorModules: ["Rapier", "CraneLink"],
                    craneHandlesEvent: true,
                    noSave: true,
                });
                card.call("Rapier$RapierActor", "createRigidBody", bodyDesc);
                cd = Worldcore.RAPIER.ColliderDesc.cylinder(0.9, 0.4);
            }

            cd.setRestitution(0.5);
            cd.setFriction(1);

            if (i === d - 1) { cd.setDensity(4.0); } 
            else { cd.setDensity(1.5); }

            card.call("Rapier$RapierActor", "createCollider", cd);
            return card;

        });

        this.joints = [...Array(d - 1).keys()].map((i) => {

            let card = this.createCard({
                name: `joint${i}`,
                type: "object",
                parent: this,
                behaviorModules: ["Rapier"],
                noSave: true,
            });

            card.call("Rapier$RapierActor", "createImpulseJoint", "ball", this.links[i], this.links[i + 1], {x: 0, y: -1, z: 0}, {x: 0, y: 1, z: 0});
            return card;

        });

        let name = `link${d}`;

        this.jointProto = this.createCard({
            name, // Link10, Link9 ... Link0
            type: "object",
            craneProto: true,
            parent: this,
            behaviorModules: ["CraneLink"],
        });

    }

    removeObjects() {
        if (this.links) {
            this.links.forEach(l => l.destroy());
            this.links = null; 
        }  
        if (this.joints) {
            this.joints.forEach(j => j.destroy());
            this.joints = null; 
        }
    }

    updatePositionBy(ratio) {
        this.ratio += ratio;
        this.ratio = Math.min(1, Math.max(0, this.ratio));
        this.set({translation: Worldcore.v3_lerp(this.pointA, this.pointB, this.ratio)});
    }
}

class CranePawn {
    setup() {
        if (this.obj) {
            this.shape.children.forEach((o) => this.shape.remove(o));
            this.shape.children = [];
            this.obj.dispose();
            this.obj = null;
        }

        let geometry = new Worldcore.THREE.BoxGeometry(0.5, 0.5, 0.5);
        let material = new Worldcore.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xffffff});
        this.obj = new Worldcore.THREE.Mesh(geometry, material);
        this.obj.castShadow = this.actor._cardData.shadow;
        this.obj.receiveShadow = this.actor._cardData.shadow;

        this.shape.add(this.obj);

        this.removeEventListener("pointerDoubleDown", "onPointerDoubleDown");
        this.addEventListener("pointerDoubleDown", "nop");
    }
}

class CraneLinkActor {
    setup() { }
}

class CraneLinkPawn {
    setup() {

        /*

          Creates a Three.JS mesh based on the specified rapierShape and rapierSize.
          
          For a demo purpose, it does not override an existing shape
          (by checking this.shape.children.length) so that the earth
          shape created by FlightTracker behavior is preserved.
          
          Uncomment the cyclinder case to add the cylinder shape.
        
        */

        this.removeEventListener("pointerDoubleDown", "onPointerDoubleDown");
        this.addEventListener("pointerDoubleDown", "nop");

        if (this.actor._cardData.craneProto) {return;}
        this.shape.children.forEach((c) => this.shape.remove(c));
        this.shape.children = [];

        let s = [0.1, 2.3];
        let geometry = new Worldcore.THREE.CylinderGeometry(s[0], s[0], s[1], 20);
        let material = new Worldcore.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xffffff, metalness: 0.4});
        this.obj = new Worldcore.THREE.Mesh(geometry, material);
        this.obj.castShadow = this.actor._cardData.shadow;
        this.obj.receiveShadow = this.actor._cardData.shadow;

        this.shape.add(this.obj);
    }
}

class CraneButtonActor {
    setup() {
        this.occupier = undefined;
        this.listen("publishMove", "publishMove");
        this.listen("pressButton", "pressButton");
        this.listen("publishFocus", "publishFocus");
        this.subscribe(this._cardData.myScope, "focus", "focus");
    }

    // Publish Translation
    publishMove() {
        if (this.occupier !== undefined) { this.future(60).publishMove(); }
        this.publish("crane", "updatePositionBy", this._cardData.craneSpeed);
    }

    // Update Translation
    pressButton(data) {
        let {translation, color} = data;
        this.translateTo(translation);
        this.say("updateColor", color);
    }

    // Publish New Focus
    publishFocus(viewId) {
        this.publish(this._cardData.myScope, "focus", viewId);
    }  

    // Focus Controlling Player
    focus(viewId) {
        this.occupier = viewId;
    }
}

class CraneButtonPawn {
    setup() {
        this.shape.children.forEach((c) => this.shape.remove(c));
        this.shape.children = [];

        if (this.shape.children.length === 0) {
            let s = 0.2;
            let geometry = new Worldcore.THREE.BoxGeometry(s, s, s);
            let material = new Worldcore.THREE.MeshStandardMaterial({color: this.actor._cardData.color || 0xD86508});
            this.obj = new Worldcore.THREE.Mesh(geometry, material);
            this.obj.castShadow = this.actor._cardData.shadow;
            this.obj.receiveShadow = this.actor._cardData.shadow;
            this.shape.add(this.obj);
        }

        this.addEventListener("pointerDown", "start");
        this.addEventListener("pointerUp", "stop");
        this.listen("updateColor", "updateColor");
    }

    start() {
        if (this.actor.occupier === undefined) {
            this.say("pressButton", {translation: [this.actor._translation[0], this.actor._translation[1], this.actor._translation[2] - 0.1], color: 0x313333});
            this.say("publishFocus", this.viewId);
            this.say("publishMove");
        }
    }

    stop() {
        if (this.actor.occupier === this.viewId) {
            this.say("pressButton", {translation: [this.actor._translation[0], this.actor._translation[1], this.actor._translation[2] + 0.1], color: 0xD86508});
            this.say("publishFocus", undefined);
        }
    }

    updateColor(color) {
        this.obj.material.color.set(color);
    }
}

/*
  Three behavior modules are exported from this file.
*/

export default {
    modules: [
        {
            name: "Crane",
            actorBehaviors: [CraneActor],
            pawnBehaviors: [CranePawn]
        },
        {
            name: "CraneLink",
            actorBehaviors: [CraneLinkActor],
            pawnBehaviors: [CraneLinkPawn]
        },
        {
            name: "CraneButton",
            actorBehaviors: [CraneButtonActor],
            pawnBehaviors: [CraneButtonPawn],
        }
    ]
}

/* globals Worldcore */
