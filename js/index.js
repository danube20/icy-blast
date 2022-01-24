const iceBlast = {
    appName: 'Ice Blast',
    author: 'Guillermo Ávila & Andrés García',
    version: 'Beta 0.0.1',
    gameSize: { w: undefined, h: undefined },
    license: undefined,
    ctx: undefined,
    player: undefined,
    platforms: {
        platforms1: [],
        platforms2: [],
        platforms3: []
    },
    platformsCounter: 0,
    enemies: undefined,
    bullets: undefined,
    FPS: 60,

    init() {
        this.setContext()
        this.setSize()
        this.fillDoc()
        this.mainPlayer()
        this.drawAll()
        this.createPlatform()
        this.detectCollisions()
        this.createEnenemies()
        this.createBullets()
        this.moveDown()
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
    fillDoc() {
        this.ctx.fillStyle = 'red'
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)
    },
    mainPlayer() {
        this.player = new Player(this.ctx, this.gameSize.w / 2, this.gameSize.h / 2, this.gameSize.w, this.gameSize)
    },
    createPlatform() {
        this.platforms.platforms1.push(new Platform(this.ctx, this.gameSize, 600))
        this.platforms.platforms1.push(new Platform(this.ctx, this.gameSize, 300))
        this.platforms.platforms1.push(new Platform(this.ctx, this.gameSize, 100))
        this.platforms.platforms2.push(new Platform(this.ctx, this.gameSize, 560))
        this.platforms.platforms2.push(new Platform(this.ctx, this.gameSize, 350))
        this.platforms.platforms2.push(new Platform(this.ctx, this.gameSize, 260))
        this.platforms.platforms3.push(new Platform(this.ctx, this.gameSize, 680))
        this.platforms.platforms3.push(new Platform(this.ctx, this.gameSize, 485))
        this.platforms.platforms3.push(new Platform(this.ctx, this.gameSize, 30))
    },
    createEnenemies() {
        this.enemies = new Enemy(this.ctx, this.gameSize, this.bulletDmg)
    },
    createBullets() {
        this.bullets = new Bullets(this.ctx)
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    }, drawAll() {
        setInterval(() => {
            this.platformsCounter += 1
            // this.platformsCounter % 2 === 0 ? this.createPlatform() : null
            this.clearAll()
            this.fillDoc()
            this.player.draw()
            this.platforms.platforms1.forEach(elm => {
                elm.draw()
            })
            this.platforms.platforms2.forEach(elm => {
                elm.draw()
            })
            this.platforms.platforms3.forEach(elm => {
                elm.draw()
            })
            this.enemies.draw()
            this.player.clearBullets()
            this.detectCollisions()
            this.player.movement()
            this.moveDown()
        }, 1000 / this.FPS)
    },
    moveDown() { // mover todos los elementos +y
        if (this.player.augustPos.y < 450 && this.player.augustVel.y < 0) {
            // si August está en la mitad del canvas subiendo, que se muevan los elementos
            this.platforms.platforms1.forEach((eachPlatform) => {
                eachPlatform.platformPos.y += 3
            })
            this.platforms.platforms2.forEach((eachPlatform) => {
                eachPlatform.platformPos.y += 3
            })
            this.platforms.platforms3.forEach((eachPlatform) => {
                eachPlatform.platformPos.y += 3
            })
            this.enemies.enemyPos.y += 3
        }
    },
    detectCollisions() {
        this.platforms.platforms1.forEach((eachPlatform) => {
            if (this.player.augustPos.x < eachPlatform.platformPos.x + eachPlatform.platformSize.w &&
                this.player.augustPos.x + this.player.augustSize.w > eachPlatform.platformPos.x &&
                this.player.augustPos.y < eachPlatform.platformPos.y + eachPlatform.platformSize.h &&
                this.player.augustSize.h + this.player.augustPos.y > eachPlatform.platformPos.y) {
                // ¡colision detectada!
                if (this.player.augustVel.y > 0) {
                    this.player.bounce()
                }
            }
        })
        this.platforms.platforms2.forEach((eachPlatform) => {
            if (this.player.augustPos.x < eachPlatform.platformPos.x + eachPlatform.platformSize.w &&
                this.player.augustPos.x + this.player.augustSize.w > eachPlatform.platformPos.x &&
                this.player.augustPos.y < eachPlatform.platformPos.y + eachPlatform.platformSize.h &&
                this.player.augustSize.h + this.player.augustPos.y > eachPlatform.platformPos.y) {
                // ¡colision detectada!
                if (this.player.augustVel.y > 0) {
                    this.player.bounce()
                }
            }
        })
        this.platforms.platforms3.forEach((eachPlatform) => {
            if (this.player.augustPos.x < eachPlatform.platformPos.x + eachPlatform.platformSize.w &&
                this.player.augustPos.x + this.player.augustSize.w > eachPlatform.platformPos.x &&
                this.player.augustPos.y < eachPlatform.platformPos.y + eachPlatform.platformSize.h &&
                this.player.augustSize.h + this.player.augustPos.y > eachPlatform.platformPos.y) {
                // ¡colision detectada!
                if (this.player.augustVel.y > 0) {
                    this.player.bounce()
                }
            }
        })
    }
}
iceBlast.init()