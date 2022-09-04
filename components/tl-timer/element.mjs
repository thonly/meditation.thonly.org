import template from './template.mjs';

class TlTimer extends HTMLElement {
    #timer;
    #startButton;
    #startTime;
    #pauseDuration;
    #alarmDuration;
    #playing;

    #timerElement;
    #pauseButton;
    #stopButton;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.#timerElement = this.shadowRoot.getElementById('timer');
        this.#pauseButton = this.shadowRoot.getElementById('pause');
        this.#stopButton = this.shadowRoot.getElementById('stop');
    }

    start(element, minutes=0) {
        clearInterval(this.#timer);
        this.#timerElement.style.color = 'green';
        this.#pauseButton.disabled = false;
        this.#stopButton.disabled = false;
        this.#pauseButton.textContent = "Pause";
        element.disabled = true;
        if (this.#startButton) this.#startButton.disabled = false;
        this.#startButton = element;
        this.#playing = true;
        
        this.#startTime = new Date();
        this.#alarmDuration = this.#getFormattedDuration(minutes*60);
        this.#run();
        this.dispatchEvent(new CustomEvent("tl-timer", { bubbles: true, composed: true, detail: { event: "start" }}));
    }
    
    pause(element) {
        if (this.#playing) {
            this.#pauseDuration = new Date() - this.#startTime;
            clearInterval(this.#timer);
            this.#playing = false;
            element.textContent = "Resume";
            this.dispatchEvent(new CustomEvent("tl-timer", { bubbles: true, composed: true, detail: { event: "pause" }}));
        } else {
            this.#startTime = new Date() - this.#pauseDuration;
            this.#run();
            this.#playing = true;
            element.textContent = "Pause";
            this.dispatchEvent(new CustomEvent("tl-timer", { bubbles: true, composed: true, detail: { event: "resume" }}));
        }
    }
    
    stop(element) {
        clearInterval(this.#timer);
        this.#startButton.disabled = false;
        this.#startButton = null;
        this.#pauseButton.disabled = true;
        this.#stopButton.disabled = true;
        this.#playing = false;
        this.#pauseButton.textContent = "Pause";
        this.#timerElement.style.color = 'black';
        this.dispatchEvent(new CustomEvent("tl-timer", { bubbles: true, composed: true, detail: { event: "stop" }}));
    }

    #run() {
        this.#timer = setInterval(() => {
            const timerDuration = this.#getFormattedDuration((new Date() - this.#startTime) / 1000);
            this.#timerElement.textContent = timerDuration;
    
            if (timerDuration === this.#alarmDuration) {
                this.dispatchEvent(new CustomEvent("tl-timer", { bubbles: true, composed: true, detail: { event: "alarm" }}));
            } else if (timerDuration > this.#alarmDuration) {
                this.#timerElement.style.color = 'red';
                //this.#startButton.disabled = false;
            }

            this.dispatchEvent(new CustomEvent("tl-timer", { bubbles: true, composed: true, detail: { event: "tick", timerDuration, alarmDuration: this.#alarmDuration }}));
        }, 1000);
    }

    #getFormattedDuration(totalSeconds) {
        const h = Math.floor(totalSeconds / 3600);
        const m = Math.floor(totalSeconds % 3600 / 60);
        const s = Math.floor(totalSeconds % 3600 % 60);
    
        const hours = String(h).padStart(2, '0');
        const minutes = String(m).padStart(2, '0');
        const seconds = String(s).padStart(2, '0');
    
        return `${hours}:${minutes}:${seconds}`;
    }
}

customElements.define("tl-timer", TlTimer);