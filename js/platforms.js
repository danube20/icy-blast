class Platforms {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.platformPos = { x: 150, y: 570 }
        this.gameSize = gameSize
        this.platformSize = { w: 80, h: 15 }

        this.init()
    }

    init() {
        this.draw()
    }
    draw() {
        this.ctx.fillRect(this.platformPos.x, this.platformPos.y, this.platformSize.w, this.platformSize.h)
    }
    // positionX() {
    //     const range = { min: 20, max: 400 },
    //         delta = range.max - range.min

    //     let rand = Math.round(range.min + Math.random() * delta)
    //     return rand
    // }

}