const iceBlast = {
    appName: 'Ice Blast',
    author: 'Guillermo Ávila & Andrés García',
    version: 'Beta 0.0.1',
    gameSize: { w: undefined, h: undefined },
    license: undefined,
    ctx: undefined,
    player: undefined,
    background: undefined,
    platformTypes: [1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2, 2, 2, 2, 1, 2, 1, 1, 1, 1, 2, 2, 1, 2, 1, 1, 1, 2, 1, 2, 2, 2, 1],
    platforms: [],
    platformPosition: undefined,
    platformsCounter: 0,
    platformDistance: 50,
    enemies: undefined,
    enemiesArr: [],
    bullets: undefined,
    FPS: 60,
    scorePoints: 0,

    init() {
        this.setContext()
        this.setSize()
        this.mainPlayer()
        this.createBullets()
        this.createBackground()
        this.drawAll()
        this.createPlatform()
        this.detectCollisions()
        this.createEnemies()
        this.enemiesClass()
        this.callPlatform()
    },

    setContext() {
        this.ctx = document.querySelector('#canvas').getContext('2d')
    },
    setSize() {
        this.gameSize = {
            w: 550,
            h: window.innerHeight - 20
        }
        document.querySelector('#canvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#canvas').setAttribute('height', this.gameSize.h)
    },
    callPlatform() {
        this.platformPosition = new Platform(this.ctx, this.gameSize, this.gameSize.h - this.platformDistance)
    },
    createPlatform() {
        this.platformTypes.forEach((eachNumber) => {
            if (eachNumber === 1) {
                this.platforms.push(new Platform(this.ctx, this.gameSize, this.gameSize.h - this.platformDistance))
                this.platformDistance += 150
            } else if (eachNumber === 2) {
                this.platforms.push(new MovingPlatform(this.ctx, this.gameSize, this.gameSize.h - this.platformDistance))
                this.platformDistance += 150
            }
        })
    },
    mainPlayer() {
        this.player = new Player(this.ctx, this.gameSize.w / 2, this.gameSize.h / 2, this.gameSize.w, this.gameSize, this.platforms)
    },
    createBackground() {
        this.background = new BaseBackground(this.ctx, 0, 0, this.gameSize)
    },
    createBullets() {
        this.bullets = new Bullets(this.ctx, this.player.augustPos.x, this.player.augustPos.y, this.player.augustSize.w, this.player.augustSize.h)
    },
    createEnemies() {
        this.enemiesArr.push(new Enemy(this.ctx, this.platformPosition.platformPos.x, this.platformPosition.platformPos.y, this.gameSize))
        this.enemiesArr.push(new Enemy(this.ctx, this.gameSize))
        this.enemiesArr.push(new Enemy(this.ctx, this.gameSize))
        this.enemiesArr.push(new Enemy(this.ctx, this.gameSize))
    },
    enemiesClass() {
        this.enemies = new Enemy(this.ctx, this.gameSize)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },
    score() {
        // su distancia a la primera plataforma
        this.scorePoints = Math.floor((this.platforms[0].platformPos.y - this.gameSize.h + 50) / 20) //posición inicial
    },
    drawScore() {
        this.ctx.font = '30px sans-serif'
        this.ctx.fillStyle = 'white'
        if (this.scorePoints < 10) this.ctx.fillText(this.scorePoints, 267, 62)
        else if (this.scorePoints >= 10 && this.scorePoints < 100) this.ctx.fillText(this.scorePoints, 259, 62)
        else this.ctx.fillText(this.scorePoints, 249, 62)
    },
    detectCollisions() {
        this.platforms.forEach((eachPlatform) => {
            if (this.player.augustPos.x < eachPlatform.platformPos.x + eachPlatform.platformSize.w &&
                this.player.augustPos.x + this.player.augustSize.w > eachPlatform.platformPos.x &&
                this.player.augustPos.y + this.player.augustSize.h < eachPlatform.platformPos.y + eachPlatform.platformSize.h &&
                this.player.augustSize.h + this.player.augustPos.y > eachPlatform.platformPos.y) {
                if (this.player.augustVel.y > 0) {
                    this.player.bounce()
                }
            }
        })
    },
    checkHealth() {
        this.player.bullets.forEach(elm => {
            this.enemiesArr.forEach(elm1 => {
                if (elm.bulletPos.x < elm1.enemyPos.x + elm1.enemySize.w &&
                    elm.bulletPos.x + elm.bulletSize.w - 45 > elm1.enemyPos.x &&
                    elm.bulletPos.y < elm1.enemyPos.y + elm1.enemySize.h &&
                    elm.bulletSize.h - 45 + elm.bulletPos.y > elm1.enemyPos.y) {
                    if (elm1.health > 0) {
                        elm1.health -= 5
                    }
                    if (elm1.health === 0) {
                        let id = this.enemiesArr.indexOf(elm1)
                        this.enemiesArr.splice(id, 1)
                    }
                }
            })
        })
    },
    drawAll() {
        setInterval(() => {
            this.clearAll()
            this.background.draw()
            this.player.draw()
            this.platforms.forEach(elm => {
                elm.draw()
                if (elm instanceof MovingPlatform) {
                    elm.move()
                }
            })
            this.enemiesArr.forEach(elm => {
                elm.draw()
            })
            this.player.clearBullets()
            this.detectCollisions()
            this.player.movement()
            this.checkHealth()
            this.score()
            this.drawScore()
        }, 1000 / this.FPS)
    }
}
iceBlast.init()