const iceBlast = {
    appName: 'Ice Blast',
    author: 'Guillermo Ávila & Andrés García',
    version: 'Beta 0.0.1',
    gameSize: { w: undefined, h: undefined },
    license: undefined,
    ctx: undefined,
    player: undefined,
    platforms: [],
    bullets: [],

    init() {
        this.setContext()
        this.setSize()
        this.fillDoc()
        this.mainPlayer()
        this.setEventHandlers()
        this.drawAll()
        this.createPlatform()
        this.detectCollisions()
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
        this.player = new Player(this.ctx, this.gameSize.w / 2, this.gameSize.h / 2, this.gameSize)
    },
    createPlatform() {
        this.platform = new Platforms(this.ctx, this.gameSize)
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

        }, 40)
    },
    setEventHandlers() {
        document.addEventListener('keydown', event => {
            const { key } = event
            key === 'ArrowRight' ? this.player.moveRight() : null
            key === 'ArrowLeft' ? this.player.moveLeft() : null
        })
    },
    moveDown() { // mover todos los elementos +y

    },
    detectCollisions() {
        if (this.player.augustPos.x < this.platform.platformPos.x + this.platform.platformSize.w &&
            this.player.augustPos.x + this.player.augustSize.w > this.platform.platformPos.x &&
            this.player.augustPos.y < this.platform.platformPos.y + this.platform.platformSize.h &&
            this.player.augustSize.h + this.player.augustPos.y > this.platform.platformPos.y) {
            console.log('colision')
        }
    }
}
iceBlast.init()