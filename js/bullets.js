class Bullets {
    constructor(ctx, augustPosX, augustPosY, augustPosY0, augustW, augustH, gameSize) {
        this.ctx = ctx
        this.bulletPos = { x: augustPosX + augustW, y: augustPosY + (augustH / 2) }
        this.augustPosY0 = augustPosY0
        this.gameSize = gameSize
        this.augustSize = { w: augustW, h: augustH }
        this.augustVel = { x: 10, y: 1 }

        this.init()
    }

    init() {
        this.draw()
        this.move()
    }
    draw() {
        this.ctx.beginPath()
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.bulletPos.x, this.bulletPos.y, 10, 10)
        this.ctx.closePath()

        this.move()
    }
    move() {
        this.bulletPos.x += this.augustVel.x
        this.bulletPos.y += this.augustVel.y
    }
}