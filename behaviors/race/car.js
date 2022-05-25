class DriveActor {
    setup() {
        if (this.speed === undefined) this.speed = 0.0;
        if (this.angle === undefined) this.angle = 0.0;
        if (this.running === undefined) {
            this.running = true;
            this.run();
        }
        this.addEventListener("keyDown", "control");
        this.addEventListener("pointerDown", "ride");
        this.subscribe("scope", "newAngle", "newAngle");
    }
    run() {
        if (!this.running) {return;}
        this.future(20).run();
        this.rotateBy([0, -this.angle, 0]);
        this.forwardBy(-this.speed);
        if (this.avatar) {
            let t = this._translation;
            this.avatar.translateTo([t[0] + 5.0, t[1] + 3.0, t[2]]);
            this.avatar.rotateTo(this._rotation);
        }
    }
    ride() {
        let actors = this.queryCards();
        let avatar = actors.find(o => o.layers.includes("avatar"));
        this.avatar = avatar;
        this.riding = true;
    }
    newAngle(angle) {
        angle = angle / 20;
        console.log(angle);
        this.angle = angle;
    }
    rotateBy(angles) {
        let q = Worldcore.q_euler(...angles);
        q = Worldcore.q_multiply(this.rotation, q);
        this.rotateTo(q);
    }
    forwardBy(dist) {
        let v = Worldcore.v3_rotate([dist, 0, 0], this.rotation);
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
        } else if (key.key === "ArrowUp") {
            this.speed = Math.min(1, this.speed + 0.025);
        } else if (key.key === "ArrowDown") {
            this.speed = Math.max(-0.2, this.speed - 0.025);
        }
    }
    destroy() {
        this.removeEventListener("pointerDown", "toggle");
        this.removeEventListener("keyDown", "turn");
        this.running = false;
    }
}

class CircleActor {
    setup() {
        if (!this.circling) {
            this.circling = true;
            this.step();
        }
        this.addEventListener("pointerDown", "toggle");
    }

    step() {
        if (!this.circling) {return;}
        this.future(20).step();
        this.rotateBy([0, 0.01, 0]);
        this.forwardBy(0.03);
    }

    toggle() {
        this.circling = !this.circling;
        if (this.circling) {
            this.step();
        }
    }

    rotateBy(angles) {
        let q = Worldcore.q_euler(...angles);
        q = Worldcore.q_multiply(this.rotation, q);
        this.rotateTo(q);
    }

    forwardBy(dist) {
        let v = Worldcore.v3_rotate([0, 0, dist], this.rotation)
        this.translateTo([
            this.translation[0] + v[0],
            this.translation[1] + v[1],
            this.translation[2] + v[2]]);
    }

    destroy() {
        this.removeEventListener("pointerDown", "toggle");
        this.circling = false;
    }
}

export default {
    modules: [
        {
            name: "Drive",
            actorBehaviors: [DriveActor]
        },
        {
            name: "Circle",
            actorBehaviors: [CircleActor],
        }
    ]
}

/* globals Worldcore */
