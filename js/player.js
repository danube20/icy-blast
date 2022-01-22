class Player { // August
    constructor(ctx, posX, posY, gameSizeW, gameSize) {
        this.ctx = ctx;
        this.augustSize = { w: 50, h: 50 }
        this.augustPos = { x: posX, y: posY }
        this.gameSize = gameSize;
        this.gameSizeW = gameSizeW
        this.augustVel = { x: 0, y: 0 }
        this.augustPhysics = { gravity: 1 }
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
        this.augustPos.x += 20;
        this.crossScreenRight()
    }
    moveLeft() {
        this.augustPos.x -= 20;
        this.croosScreenLeft()
    }

    gravity() {
        this.augustVel.y += this.augustPhysics.gravity
        this.augustPos.y += this.augustVel.y

        if (this.checkCollision()) {
            this.augustVel.y = -25
        }
    }

    bounce() {
        this.augustVel.y = -22
    }

    checkCollision() {
        if (this.augustPos.y >= this.gameSize.h - this.augustSize.h) {
            return true
        }
    }

    crossScreenRight() {
        if (this.augustPos.x > this.gameSize.w) {
            this.augustPos.x = 0 - this.augustSize.w
        }
    }

    croosScreenLeft() {
        if (this.augustPos.x + this.augustSize.w < 0) {
            this.augustPos.x = this.gameSize.w
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

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.augustPos.x, this.augustPos.y, this.augustSize.w, this.augustSize.h))
        console.log(this.bullets)
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.bulletPos.y >= 0)
    }

}