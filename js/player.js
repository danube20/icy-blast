class Player { // August
    constructor(ctx, posX, posY, gameSizeW, gameSize) {
        this.ctx = ctx;
        this.augustSize = { w: 50, h: 50 }
        this.augustPos = { x: posX, y: posY }
        this.gameSize = gameSize;
        this.gameSizeW = gameSizeW
        this.augustVel = { x: 0, y: 0 }
        this.augustPhysics = { gravity: .8 }
        this.bullets = []
        this.keyPressed = []
        this.enemies = undefined

        this.init();
    }

    init() {
        this.draw()
        this.setEventHandlers()
        this.checkHealth()
    }

    draw() { // Augusto
        this.ctx.fillStyle = 'Black';
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
            else if (elm.includes('shoot')) {
                this.shoot()
            }
        })
    }

    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            if (key === 'ArrowRight') this.keyPressed.push('ArrowRight')
            else if (key === 'ArrowLeft') this.keyPressed.push('ArrowLeft')
            else if (key === ' ') this.keyPressed.push('shoot')
            else return null
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
        this.augustVel.y += this.augustPhysics.gravity
        this.augustPos.y += this.augustVel.y

        if (this.checkCollision()) {
            this.augustVel.y = -16
        }
    }

    bounce() {
        this.augustVel.y = -16
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

    crossScreenLeft() {
        if (this.augustPos.x + this.augustSize.w < 0) {
            this.augustPos.x = this.gameSize.w
        }
    }


    shoot() {
        this.bullets.push(new Bullets(this.ctx, this.augustPos.x, this.augustPos.y, this.augustSize.w, this.augustSize.h))
    }

    clearBullets() {
        this.bullets = this.bullets.filter(bull => bull.bulletPos.y >= 0)
    }
    callEnemy() {
        this.enemies = new Enemy(this.ctx, this.gameSize)
    }
    checkHealth() {
        this.bullets.map(elm => {
            if (elm.bulletPos.x < this.enemies.enemyPos.x + this.enemies.enemySize.w &&
                elm.bulletPos.x + elm.bulletSize.w > this.enemies.enemyPos.x &&
                elm.bulletPos.y < this.enemies.enemyPos.y + this.enemies.enemySize.h &&
                elm.bulletSize.h + elm.bulletPos.y > this.enemies.enemyPos.y) {
                console.log('asdad');
            }
        })
    }

}