import template from './template.mjs';
import { getRandomInteger } from '/components/tl-body/utils.mjs';

class TlMusic extends HTMLElement {
    #audio;
    #option;
    #note = 0;
    #chakras = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white'];

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#option = this.shadowRoot.getElementById('music');
    }

    play() {
        this.#option.disabled = true;
        if (this.#audio) this.#audio.load();
        this.#audio = null;

        switch (this.#option.value) {
            case "silence":
                break;
            case "binaural":
                this.#playBinaural();
                break;
            case "thonly":
                this.#playBrahminTHonly();
                break;
        }
    }

    pause() {
        if (this.#audio) this.#audio.pause();
    }

    resume() {
        if (this.#audio) this.#audio.play();
    }

    stop() {
        this.#option.disabled = false;
        document.body.style.backgroundColor = 'white';
        if (this.#audio) this.#audio.pause();
    }

    tick(timerDuration, alarmDuration) {
        switch (this.#option.value) {
            case "silence":
                break;
            case "alarm":
                document.body.style.backgroundColor = this.#randomColor();
                if (timerDuration === alarmDuration) this.#playAlarm();
                break;
            case "uniaural":
                if (timerDuration < alarmDuration) document.body.style.backgroundColor = alarmDuration < "01:00:00" ? this.#playScaleInOrder() : this.#playScaleRandom();
                break;
            case "kiitos":
                if (timerDuration < alarmDuration) document.body.style.backgroundColor = this.#playBrahminKiitos();
                break;
            default:
                document.body.style.backgroundColor = this.#randomColor;
                break;
        }
    }

    //FIXME: change to relative url? how?
    #playAlarm() {
        const audio = new Audio(`components/tl-music/alarm/${getRandomInteger(1, 13)}.wav`);
        audio.play();
    }
    
    // C Major Diatonic Scale
    #playScaleInOrder() {
        if (this.#note === 8) this.#note = 0;
        const audio = new Audio(`components/tl-music/uniaural/${++this.#note}.wav`);
        audio.play();
        return this.#chakras[this.#note - 1];
    }
    
    // C Major Diatonic Scale
    #playScaleRandom() {
        const note = getRandomInteger(1, 8);
        const audio = new Audio(`components/tl-music/uniaural/${note}.wav`);
        audio.play();
        return this.#chakras[note - 1];
    }
    
    #playBinaural() {
        this.#audio = new Audio(`components/tl-music/binaural/${getRandomInteger(1, 4)}.m4a`);
        this.#audio.loop = true;
        this.#audio.play();
    }
    
    // Chromatic Scale
    #playBrahminKiitos() {
        const note = getRandomInteger(40, 56);
        const audio = new Audio(`components/tl-music/kiitos/0${note}.wav`);
        audio.play();
        return this.#chakras[Math.floor(note/8)];
    }
    
    #playBrahminTHonly() {
        this.#audio = new Audio(`components/tl-music/thonly/${getRandomInteger(1, 1)}.mp3`);
        this.#audio.loop = true;
        this.#audio.play();
    }

    get #randomColor() {
        return `rgb(${getRandomInteger(0, 255)}, ${getRandomInteger(0, 255)}, ${getRandomInteger(0, 255)})`;
    }
}

customElements.define("tl-music", TlMusic);