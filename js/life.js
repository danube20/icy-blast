class LifeBall {
    constructor(ctx, gameSize, posX) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.posX = posX
        this.init()
    }
    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/life.png'
    }
    draw() {
        this.ctx.drawImage(this.imageInstance, this.posX, 40, 25, 25)
    }
}