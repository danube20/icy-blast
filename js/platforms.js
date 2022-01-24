class Platform {
    constructor(ctx, gameSize, posY, augustPosX, augustPosY) {
        this.ctx = ctx
        this.platformPos = { x: undefined, y: posY }
        this.gameSize = gameSize
        this.augustPos = { x: augustPosX, y: augustPosY }
        this.platformSize = { w: 80, h: 15 }
        this.init()
    }
    init() {
        this.randomPosX()
        this.draw()
    }
    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
    randomPosX() {
        this.platformPos.x = Math.random() * (420 - 0)
    }
}
