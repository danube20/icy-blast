class Bullets {
    constructor(ctx, augustPosX, augustPosY, augustW, augustH) {
        this.ctx = ctx
        this.bulletPos = { x: augustPosX + 20, y: augustPosY + (augustH / 2) }
        this.bulletSize = { w: 10, h: 10 }
        this.augustSize = { w: augustW, h: augustH }
        this.augustVel = { x: 25, y: 1 }

        this.init()
    }

    init() {
        this.draw()
        this.move()
    }
    draw() {
        this.ctx.fillStyle = 'black'
        this.ctx.fillRect(this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)

        this.move()
    }
    move() {
        this.bulletPos.x += this.augustVel.y
        this.bulletPos.y -= this.augustVel.x
    }
}