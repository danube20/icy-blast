class Player { // August
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx;
        this.augustPos = { x: posX, y: posY };
        this.gameSize = gameSize;

        this.augustVel = { x: 0, y: 0 }
        this.augustPhysics = { gravity: 0.8 }

        this.augustSize = { w: 50, h: 50 }

        this.init();
    }

    init() {
        this.draw()

    }

    draw() { // Augusto
        this.ctx.fillStyle = 'Black';
        this.ctx.fillRect(this.augustPos.x, this.augustPos.y, this.augustSize.w, this.augustSize.h)
        this.gravity()
    }

    moveRight() {
        this.augustPos.x += 10;
    }

    moveLeft() {
        this.augustPos.x -= 10;
    }

    gravity() {
        this.augustVel.y += this.augustPhysics.gravity
        this.augustPos.y += this.augustVel.y

        if (this.checkCollision()) {
            this.augustVel.y = -25
        }
    }

    checkCollision() {
        if (this.augustPos.y >= this.gameSize.h - this.augustSize.h) {
            console.log("colission")
            return true
        }
    }


    // resetVelocity() {
    //     // set a velocity
    //     this.augustVel.y = 2 + this.augustPhysics.gravity
    // }

    // physics() {

    //     this.augustVel.y = this.resetVelocity()
    //     this.augustPos.y += this.augustVel.y

    //     if (this.checkCollisionY()) {
    //         this.augustVel.y *= -1
    //     }
    // }

    // checkCollisionY() {
    //     if (this.augustPos.y >= this.gameSize.h - this.augustSize.h) { // bottom
    //         return true
    //     }
    //     return false

    // }

}