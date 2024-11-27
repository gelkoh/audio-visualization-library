export class AudioAnalyser {
    private audioContext: AudioContext
    private analyser: AnalyserNode 
    private dataArray: Uint8Array

    constructor(audioElement: HTMLAudioElement) {
        this.audioContext = new AudioContext()
        const source = this.audioContext.createMediaElementSource(audioElement)
        this.analyser = this.audioContext.createAnalyser()
        source.connect(this.analyser)
        this.analyser.connect(this.audioContext.destination)

        this.analyser.fftSize = 256
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount)
    }

    getFrequencyData() {
        this.analyser.getByteFrequencyData(this.dataArray)
        return this.dataArray
    }
}
