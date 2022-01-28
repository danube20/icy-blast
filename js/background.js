class BaseBackground {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.backPos = { x: posX, y: posY }
        this.imageInstance = undefined
        this.backVel = { x: 0, y: 0 }
        this.backGravity = 1


        this.init()
    }

    init() {
        this.imageInstance = new Image()
        this.imageInstance.src = './img/long-background.png'
    }
    draw() {
        this.ctx.drawImage(this.imageInstance, this.backPos.x, this.backPos.y, this.gameSize.w, this.gameSize.h * 3)
    }
    move() {
        this.backVel.y += this.backGravity
        this.backPos.y += this.backVel.y
    }
}

class BackgroundY {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.backYPos = { x: posX, y: posY }
        this.gameSize = gameSize;
    }
    move() {

    }
}