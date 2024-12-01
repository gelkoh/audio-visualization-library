export class CanvasRenderer {
    private canvas: HTMLCanvasElement
    private ctx: CanvasRenderingContext2D
    
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas 
        const context = canvas.getContext("2d")
        if (!context) throw new Error("Unable to get canvas context") 
        this.ctx = context
    }
    
    getCanvas() {
        return this.canvas
    }

    getCtx() {
        return this.ctx
    }

    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
}
