class Player { // August
    constructor(ctx, posX, posY, gameSizeW, gameSize, platforms, enemies) {
        this.ctx = ctx;
        this.augustSize = { w: 45, h: 45 }
        this.augustPos = { x: posX, y: posY }
        this.gameSize = gameSize;
        this.gameSizeW = gameSizeW
        this.augustVel = { x: 0, y: 0 }
        this.augustPhysics = { gravity: .6 }
        this.bullets = []
        this.bulletsClass = undefined
        this.keyPressed = []
        this.platforms = platforms
        this.score = 0
        this.enemies = enemies
        this.health = 30
        this.imageInstance = undefined

        this.init();
    }

    init() {
        this.setEventHandlers()
    }

    draw() { // Augusto
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(this.augustPos.x, this.augustPos.y, this.augustSize.w, this.augustSize.h)
        this.gravity()
        this.bullets.forEach(bullet => bullet.draw())
        this.clearBullets()
    }

    movement() {
        this.keyPressed.forEach(elm => {
            if (elm.includes('ArrowRight')) {
                this.augustPos.x += 5;
                this.crossScreenRight()
            }
            else if (elm.includes('ArrowLeft')) {
                this.augustPos.x -= 5;
                this.crossScreenLeft()
            }
        })
    }

    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            if (key === 'ArrowRight' && !this.keyPressed.includes('ArrowRight')) this.keyPressed.push('ArrowRight')
            else if (key === 'ArrowLeft' && !this.keyPressed.includes('ArrowLeft')) this.keyPressed.push('ArrowLeft')
            else return null
        })
        document.addEventListener('keydown', event => {
            const { key } = event
            key === ' ' ? this.shoot() : null
        })
        document.addEventListener('keyup', event => {
            const { key } = event
            if (key === 'ArrowRight') this.keyPressed = []
            else if (key === 'ArrowLeft') this.keyPressed = []
            else if (key === ' ') this.keyPressed = []
            else return null
        })
    }
    gravity() {
        if (this.augustPos.y >= (this.gameSize.h / 2)) {
            this.augustVel.y += this.augustPhysics.gravity
            this.augustPos.y += this.augustVel.y
        } else {
            this.platforms.forEach((eachPlatform) => {
                if (this.augustVel.y < 0) {
                    eachPlatform.platformPos.y -= this.augustVel.y
                }
            })
            this.enemies.forEach(eachEnemy => {
                if (this.augustVel.y < 0) {
                    eachEnemy.enemyPos.y -= this.augustVel.y
                }
            })
            this.augustPos.y = this.gameSize.h / 2
            this.augustVel.y += this.augustPhysics.gravity
            this.augustPos.y += this.augustVel.y
        }
    }

    bounce(vel) {
        this.augustVel.y = vel
    }

    // checkCollision() {
    //     if (this.augustPos.y >= this.gameSize.h - this.augustSize.h) return true
    // }

    crossScreenRight() {
        if (this.augustPos.x > this.gameSize.w) this.augustPos.x = 0 - this.augustSize.w
    }

    crossScreenLeft() {
        if (this.augustPos.x + this.augustSize.w < 0) this.augustPos.x = this.gameSize.w
    }

    createBullets() {
        this.bulletsClass = new Bullets(this.ctx, this.augustPos.x, this.augustPos.y, this.augustSize.w, this.augustSize.h)
    }

    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.augustPos.x, this.augustPos.y, this.augustSize.w, this.augustSize.h))
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.bulletPos.y >= 0)
    }
}