class LifeBall {
    constructor(ctx, gameSize, posX, posY, w, h) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.ballPos = { x: posX, y: posY }
        this.ballSize = { w: w, h: h }
        this.init()
    }
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/life.png'
    }
    draw() {
        this.ctx.drawImage(this.imageInstance, this.ballPos.x, this.ballPos.y, this.ballSize.w, this.ballSize.h)
    }
}