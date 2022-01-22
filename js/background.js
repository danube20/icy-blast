class BaseBackground {
    constructor(ctx, posX, posY, gameSize) {
        this.ctx = ctx
        this.gameSize = gameSize
        this.backPos = { x: posX, y: posY }

        this.init()
    }

    init() {
        this.imageInstance()
    }
    imageInstance() {

    }
    move() {

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