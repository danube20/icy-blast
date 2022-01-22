class Player { // August
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx;
        this.augustSize = { w: 50, h: 50 }
        this.augustPos = { x: posX, y: posY };
        this.augustPosY0 = this.augustPos.y
        this.gameSize = gameSize;

        this.augustVel = { x: 0, y: 0 }
        this.augustPhysics = { gravity: 0.8 }
        this.bullets = []


        this.init();
    }

    init() {
        this.draw()
        this.setEventHandlers()
    }

    draw() { // Augusto
        this.ctx.fillStyle = 'Black';
        this.ctx.fillRect(this.augustPos.x, this.augustPos.y, this.augustSize.w, this.augustSize.h)
        this.gravity()
        this.bullets.forEach(bullet => bullet.draw())
        this.clearBullets()
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


    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.moveRight() : null
            key === 'ArrowLeft' ? this.moveLeft() : null
            key === ' ' ? this.shoot() : null
        })
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

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.augustPos.x, this.augustPos.y, this.augustPosY0, this.augustSize.w, this.augustSize.h, this.gameSize))
        console.log(this.bullets)
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.bulletPos.x <= this.gameSize)
    }

}