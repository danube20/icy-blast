const iceBlast = {
    appName: 'Ice Blast',
    author: 'Guillermo Ávila & Andrés García',
    version: 'Beta 0.0.1',
    gameSize: { w: undefined, h: undefined },
    license: undefined,
    ctx: undefined,
    player: undefined,
    platforms: [],
    enemies: undefined,
    bulletDmg: undefined,

    init() {
        this.setContext()
        this.setSize()
        this.fillDoc()
        this.mainPlayer()
        this.drawAll()
        this.createPlatform()
        this.detectCollisions()
        this.createEnenemies()
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
        this.platform = new Platforms(this.ctx, this.gameSize)
    },
    createEnenemies() {
        this.enemies = new Enemy(this.ctx, this.gameSize, this.bulletDmg)
    },
    bulletDamage() {
        this.bulletDmg = new Bullets().bulletDamage();
    },
    clearAll() {
        this.ctx.clearRect(0, 0, this.gameSize.w, this.gameSize.h)
    },
    drawAll() {
        setInterval(() => {
            this.clearAll()
            this.fillDoc()
            this.player.draw()
            this.platform.draw()
            this.enemies.draw()
            this.player.clearBullets()
            this.detectCollisions()
        }, 40)
    },
    moveDown() { // mover todos los elementos +y
    },
    detectCollisions() {
        if (this.player.augustPos.x < this.platform.platformPos.x + this.platform.platformSize.w &&
            this.player.augustPos.x + this.player.augustSize.w > this.platform.platformPos.x &&
            this.player.augustPos.y < this.platform.platformPos.y + this.platform.platformSize.h &&
            this.player.augustSize.h + this.player.augustPos.y > this.platform.platformPos.y) {
            // ¡colision detectada!
            console.log('colision')
            if (this.player.augustVel.y > 0) {
                this.player.bounce()
            }
        }
    }
}
iceBlast.init()