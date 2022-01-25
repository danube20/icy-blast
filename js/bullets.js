class Bullets {
    constructor(ctx, augustPosX, augustPosY, augustW, augustH) {
        this.ctx = ctx
        this.bulletPos = { x: augustPosX - 25, y: augustPosY + (augustH - 100) }
        this.bulletSize = { w: 100, h: 100 }
        this.augustSize = { w: augustW, h: augustH }
        this.augustVel = { x: 25, y: 1 }
        this.imageInstance = undefined

        this.init()
    }
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/bullet.png'
    }
    draw() {
        this.move()
        this.ctx.drawImage(this.imageInstance, this.bulletPos.x, this.bulletPos.y, this.bulletSize.w, this.bulletSize.h)
    }
    move() {
        this.bulletPos.x += this.augustVel.y
        this.bulletPos.y -= this.augustVel.x
    }
}