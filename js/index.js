const iceBlast = {
    appName: 'Ice Blast',
    author: 'Guillermo Ávila & Andrés García',
    version: 'Beta 0.0.1',
    gameSize: { w: undefined, h: undefined },
    license: undefined,
    ctx: undefined,

    init() {
        this.setContext();
        this.setSize();
        this.fillDoc();
        console.log(this.gameSize);
    },

    setContext() {
        this.ctx = document.querySelector('#canvas').getContext('2d');
    },
    setSize() {
        this.gameSize = {
            w: 550,
            h: window.innerHeight - 20
        }
        document.querySelector('#canvas').setAttribute('width', this.gameSize.w)
        document.querySelector('#canvas').setAttribute('height', this.gameSize.h)
    },
    fillDoc() {
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(0, 0, this.gameSize.w, this.gameSize.h)
    }
}

iceBlast.init();