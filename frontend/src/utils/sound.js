export class SoundCalling {
    #sound = new Audio()
    constructor(audioFile) {
        this.#sound.src = audioFile;
    }
    playing(active) {
        if (active) {
            this.#sound.loop = true;
            this.#sound.controls = true;
            this.#sound.play();
        } else {
            this.#sound.loop = false;
            this.#sound.pause();
            this.#sound.currentTime = 0;
        }
    }
}