// Car (Driver)
// Copyright 2022 Croquet Corporation
// Croquet Microverse

class DriveActor {

    setup() {
        if (this.speed === undefined) this.speed = 0.0;
        if (this.angle === undefined) this.angle = 0.0;
        if (this.accel === undefined) this.accel = 0.0;
        if (this.running === undefined) {
            this.running = true;
            this.run();
        }
        this.addEventListener("keyDown", "control");
        this.addEventListener("keyUp", "endControl");
        this.addEventListener("pointerDown", "ride");
        this.subscribe(this._cardData.myScope, "newAngle", "newAngle");
        // this.publish(this._cardData.myScope, "reset");
        // this.subscribe(this._cardData.myScope, "control", "handleControl");
    }

    run() {
        if (!this.running) {return;}
        this.future(20).run();
        this.speed = this.speed + this.accel; // Add current acceleration to speed
        if(this.speed > 1.0){ // speed limits
            this.speed = 1.0;
        }
        if(this.speed < -0.2){
            this.speed = -0.2;
        }
        this.rotateBy([0, -this.angle, 0]);
        this.forwardBy(-this.speed);
        if (this.avatar) {
            let t = this._translation;
            this.avatar._translation = [t[0], t[1] + 1.6, t[2]];
            this.avatar._rotation = this._rotation;
            this.avatar.say("forceOnPosition");
        }
    }

    ride() {
        let actors = this.queryCards();
        let avatar = actors.find(o => o.layers.includes("avatar"));
        this.avatar = avatar;
        this.riding = true;
    }

    newAngle(angle) {
        angle = angle / 30;
        this.angle = angle;
    }

    rotateBy(angles) {
        let q = Worldcore.q_euler(...angles);
        q = Worldcore.q_multiply(this.rotation, q);
        this.rotateTo(q);
    }

    forwardBy(dist) {
        let v = Worldcore.v3_rotate([0, 0, dist], this.rotation);
        this.translateTo([
            this.translation[0] + v[0],
            this.translation[1] + v[1],
            this.translation[2] + v[2]]);
    }

    control(key) {
        if (key.key === "ArrowRight") {
            this.angle = Math.min(0.05, this.angle + 0.004);
        } else if (key.key === "ArrowLeft") {
            this.angle = Math.max(-0.05, this.angle - 0.004);
        } else if (key.key === "ArrowUp") { // up/down arrow keys accelerate the car while held
            this.accel = 0.01;
        } else if (key.key === "ArrowDown") {
            this.accel = -0.01;
        } else if (key.key === "Shift") {
            this.avatar = undefined;
            this.riding = false;
        }
    }

    endControl(key){
        if (key.key === "ArrowUp") {
            this.accel = 0.0;
        } else if (key.key === "ArrowDown") {
            this.accel = 0.0;
        }
    }

    destroy() {
        this.removeEventListener("pointerDown", "toggle");
        this.removeEventListener("keyDown", "turn", "keyUp");
        this.running = false;
    }
    
}

// class DrivePawn {
//     setup() {

//         this.shape.traverse((model) => {
//             if (model.material) { model.material.color = new Worldcore.THREE.Color(0xff0000) }
//         });

//     }
// }

export default {
    modules: [
        {
            name: "Drive",
            actorBehaviors: [DriveActor]
        }
    ]
}

/* globals Worldcore */
