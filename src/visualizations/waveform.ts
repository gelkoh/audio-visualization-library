import { AudioAnalyser } from "../utils/audio-analyser.js"
import { CanvasRenderer } from "../utils/canvas-renderer.js"

interface WaveformOptions {
    strokeStyle?: string
    lineWidth?: number
}

const defaultWaveformOptions: WaveformOptions = {
    strokeStyle: "yellow",
    lineWidth: 1
}

export class Waveform {
    private analyser: AudioAnalyser
    private renderer: CanvasRenderer
    private options: WaveformOptions

    constructor(
        canvasSelector: string, 
        audioSelector: string, 
        options: WaveformOptions = defaultWaveformOptions
    ) {
        const canvas = document.querySelector(canvasSelector) as HTMLCanvasElement | null
        const audio = document.querySelector(audioSelector) as HTMLAudioElement | null

        if (!canvas) throw new Error(`Element not found or not a <canvas>: ${canvasSelector}`)
        if (!audio) throw new Error(`Element not found or not an <audio>: ${audioSelector}`)

        this.renderer = new CanvasRenderer(canvas)
        this.analyser = new AudioAnalyser(audio)

        // Merge passed options with default options
        this.options = { ...defaultWaveformOptions, ...options }

        this.visualize()
    }

    private visualize() {
        const canvas = this.renderer.getCanvas()
        const ctx = this.renderer.getCtx()
        const yOffset = canvas.height / 2

        let freqData = this.analyser.getByteTimeDomainData()
        const distanceBetweenPoints = (canvas.width - 20) / freqData.length

        // Apply options
        ctx.strokeStyle = this.options.strokeStyle as string
        ctx.lineWidth = this.options.lineWidth as number

        const draw = () => {
            freqData = this.analyser.getByteTimeDomainData()

            this.renderer.clear()

            // Draw wave
            ctx.beginPath()
            ctx.moveTo(0, yOffset)

            freqData.forEach((value: number, index: number) => {
                ctx.lineTo((index * distanceBetweenPoints) + 10, value + yOffset - 127) 
            })

            ctx.lineTo(canvas.width, yOffset)

            ctx.stroke()

            requestAnimationFrame(draw)
        }

        draw()
    }
}
