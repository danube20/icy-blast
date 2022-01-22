class Platform {
    constructor(ctx, gameSize, augustPosX, augustPosY) {
        this.ctx = ctx
        this.platformPos = { x: undefined, y: 570 }
        this.gameSize = gameSize
        this.augustPos = { x: augustPosX, y: augustPosY }
        this.platformSize = { w: 80, h: 15 }
        this.init()
    }
    init() {
        this.draw()
        this.randomPosX()
    }
    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
    randomPosX() {
        this.platformPos.x = Math.random() * (550 - 0)
    }
}

class RegularPlatforms extends Platforms {
    constructor(ctx, gameSize) {
        super(ctx, gameSize)
        this.init()
    }
}