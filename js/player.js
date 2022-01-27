class Player { // August
    constructor(ctx, posX, posY, gameSizeW, gameSize, platforms, enemies) {
        this.ctx = ctx;
        this.augustSize = { w: 110, h: 100 }
        this.augustPos = { x: posX, y: posY }
        this.gameSize = gameSize;
        this.gameSizeW = gameSizeW
        this.augustVel = { x: 0, y: 0 }
        this.augustPhysics = { gravity: .6 }
        this.bullets = []
        this.bulletsClass = undefined
        this.keyPressed = []
        this.platforms = platforms
        this.enemies = enemies
        this.health = 100
        this.imageInstance = new Image()
        this.imageInstance.frames = 0
        this.imageInstance.framesIndex = 0
        this.audio = undefined

        this.init();
    }

    init() {
        this.imageInstance.src = './img/august_sprite.png'
        this.imageInstance.frames = 5
        this.imageInstance.framesIndex = 0
        this.setEventHandlers()
    }

    draw(framesCounter) { // Augusto
        this.ctx.drawImage(
            this.imageInstance,
            this.imageInstance.framesIndex * (this.imageInstance.width / this.imageInstance.frames),
            0,
            this.imageInstance.width / this.imageInstance.frames,
            this.imageInstance.height,
            this.augustPos.x,
            this.augustPos.y,
            this.augustSize.w,
            this.augustSize.h
        )

        this.animate(framesCounter)

        this.gravity()
        this.bullets.forEach(bullet => bullet.draw())
        this.clearBullets()
    }

    animate(framesCounter) {
        if (framesCounter % 19 == 0) {
            this.imageInstance.framesIndex++;
        }
        if (this.imageInstance.framesIndex >= this.imageInstance.frames / 2) {
            this.imageInstance.framesIndex = 0;
        }
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