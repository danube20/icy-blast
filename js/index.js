const iceBlast = {
    appName: 'Ice Blast',
    author: 'Guillermo Ávila & Andrés García',
    version: 'Beta 0.0.1',
    gameSize: { w: undefined, h: undefined },
    license: undefined,
    ctx: undefined,
    player: undefined,
    platforms: [],
    platformsCounter: 0,
    enemies: undefined,
    bullets: undefined,

    init() {
        this.setContext()
        this.setSize()
        this.fillDoc()
        this.mainPlayer()
        this.drawAll()
        this.createPlatform()
        this.detectCollisions()
        this.createEnenemies()
        this.checkHealth()
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
        this.ctx.fillStyle = 'white'
        this.ctx.fillRect(200, 320, 300, 1)
    },
    mainPlayer() {
        this.player = new Player(this.ctx, this.gameSize.w / 2, this.gameSize.h / 2, this.gameSize.w, this.gameSize)
    },
    createPlatform() {
        this.platforms.push(new Platform(this.ctx, this.gameSize))
    },
    createEnenemies() {
        this.enemies = new Enemy(this.ctx, this.gameSize, this.bulletDmg)
    },
    invokeBullets() {
        this.bullets = new Bullets()
    },
    checkHealth() {
        if (this.bullets.bulletPos.x < this.enemies.enemyPos.x + this.enemies.enemySize.w &&
            this.bullets.bulletPos.x + this.bullets.bulletSize.w > this.enemies.enemyPos.x &&
            this.bullets.bulletPos.y < this.enemies.enemyPos.y + this.enemies.enemySize.h &&
            this.bullets.bulletSize.h + this.bullets.bulletPos.y > this.enemies.enemyPos.y) {
            console.log('asdad');
        }
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    }, drawAll() {
        setInterval(() => {
            this.platformsCounter += 1
            this.platformsCounter % 40 === 0 ? this.createPlatform() : null
            this.clearAll()
            this.fillDoc()
            this.player.draw()
            this.platforms.forEach(elm => {
                elm.draw()
            })
            this.enemies.draw()
            this.player.clearBullets()
            this.detectCollisions()
            console.log(this.platforms)
        }, 40)
    },
    moveDown() { // mover todos los elementos +y
    },
    detectCollisions() {
        this.platforms.forEach((eachPlatform) => {
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