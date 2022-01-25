class Platform {
    constructor(ctx, gameSize, posY, augustPosX, augustPosY) {
        this.ctx = ctx
        this.platformPos = { x: undefined, y: posY }
        this.platformVel = { x: 1.5, y: 0 }
        this.gameSize = gameSize
        this.augustPos = { x: augustPosX, y: augustPosY }
        this.platformSize = { w: 100, h: 20 }
        this.imageinstance = undefined
        this.init()
    }
    init() {
        this.randomPosX()
        this.imageinstance = new Image()
        this.imageinstance.src = './img/platform.png'
    }
    draw() {
        this.ctx.drawImage(this.imageinstance, this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
        // this.ctx.fillStyle = 'white'
        // this.ctx.fillRect(this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
    randomPosX() {
        this.platformPos.x = Math.random() * (420 - 0)
    }
}
class MovingPlatform extends Platform {
    constructor(ctx, gameSize, posY, augustPosX, augustPosY) {
        super(ctx, gameSize, posY, augustPosX, augustPosY)
    }
    move() {
        this.checkColission()
        this.platformPos.x += this.platformVel.x
    }
    checkColission() {
        if (this.platformPos.x + this.platformSize.w > this.gameSize.w || this.platformPos.x < 0) {
            this.platformVel.x *= -1
        }
    }
}