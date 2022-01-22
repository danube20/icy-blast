class Platforms {
    constructor(ctx, gameSize) {
        this.ctx = ctx
        this.platformPos = { x: this.positionX(), y: 0 }
        this.gameSize = gameSize
        this.platformSize = { w: 80, h: 20 }

        this.init()
    }

    init() {

    }
    positionX() {
        const range = { min: 20, max: 400 },
            delta = range.max - range.min

        let rand = Math.round(range.min + Math.random() * delta)
        return rand
    }
}