import template from './template.mjs';
import { getRandomInteger } from '/components/tl-body/utils.mjs';
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
        const number = getRandomInteger(0, HEXAGRAMS.length - 1);
        return { number: number + 1, hexagram: HEXAGRAMS[number]};
    }
}

customElements.define("tl-iching", TlIching);