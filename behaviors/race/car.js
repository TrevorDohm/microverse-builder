// Car (Driver)
// Copyright 2022 Croquet Corporation
// Croquet Microverse

class DriveActor {

    setup() {
        if (this.speed === undefined) this.speed = 0.0;
        if (this.angle === undefined) this.angle = 0.0;
        if (this.accel === undefined) this.accel = 0.0;
        if (this.accelerating === undefined) this.accelerating = false;
        if (this.turning === undefined) this.turning = false;
        if (this.rotAccel === undefined) this.rotAccel = 0.0;

        this.call("Cascade$CascadeActor", "setAngDamp", 100.0);

        if (this.running === undefined) {
            this.running = true;
            this.run();
        }
        this.addEventListener("keyDown", "control");
        this.addEventListener("keyUp", "endControl");
        this.addEventListener("pointerDown", "ride");
        this.subscribe(this._cardData.myScope, "newAngle", "newAngle");
        this.subscribe(this._cardData.myScope, "newSpeed", "newSpeed");
        // this.publish(this._cardData.myScope, "reset");
    }

    run() {
        if (!this.running) {return;}
        this.future(20).run();

        if(this.accelerating) {
            let rot = this.call("Cascade$CascadeActor", "getRotation");
            let w_adjusted = Math.cos(Math.acos(rot.w) * 2);
            let y_adjusted = Math.sin(Math.asin(rot.y) * 2);
        //    console.log("w_adjusted: " + w_adjusted + ", y_adjusted: " + y_adjusted);
            this.call("Cascade$CascadeActor", "setForce", [-this.accel * y_adjusted, 0, -this.accel * w_adjusted]); //turned movement test
        }

        if(this.turning){
            this.call("Cascade$CascadeActor", "setTorque", [0, this.rotAccel, 0]);
        }

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

/*    newAngle(angle) {
        angle = angle / 20;
        this.angle = angle;
    }

    newSpeed(speed) {
        speed = speed / 5;
        this.speed = speed;
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
    }*/

    control(key) {
        if (key.key === "ArrowRight") {
            this.turning = true;
            this.rotAccel = -15;
        } else if (key.key === "ArrowLeft") {
            this.turning = true;
            this.rotAccel = 15;
        } else if (key.key === "ArrowUp") { // up/down arrow keys accelerate the car while held
            this.accel = 80;
            this.accelerating = true;
        } else if (key.key === "ArrowDown") {
            this.accel = -40;
            this.accelerating = true;
        } else if (key.key === "Shift") {
            this.avatar = undefined;
            this.riding = false;
        }
    }

    endControl(key){
        if(key.key === "ArrowRight" || key.key === "ArrowLeft"){
            this.rotAccel = 0;
            this.turning = false;
        }
        else if (key.key === "ArrowUp" || key.key === "ArrowDown") {
            this.accel = 0.0;
            this.accelerating = false;
        } 
    }

    destroy() {
        this.removeEventListener("pointerDown", "toggle");
        this.removeEventListener("keyDown", "turn", "keyUp");
        this.running = false;
    }
    
}

export default {
    modules: [
        {
            name: "Drive",
            actorBehaviors: [DriveActor]
        }
    ]
}

/* globals Worldcore */
