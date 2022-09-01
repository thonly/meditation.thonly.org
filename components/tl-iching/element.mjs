import template from './template.mjs';
import { HEXAGRAMS } from "./hexagrams.mjs";

class TlIching extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render() {
        const iching = this.#iching;
        this.shadowRoot.getElementById('iching').textContent = iching.hexagram.meaning;
        this.shadowRoot.getElementById('hexagram').textContent = iching.hexagram.figure;

        return iching.number;
    }

    get #iching() {
        const number = this.#getRandomInteger(0, HEXAGRAMS.length - 1);
        return { number: number + 1, hexagram: HEXAGRAMS[number]};
    }

    #getRandomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

customElements.define("tl-iching", TlIching);