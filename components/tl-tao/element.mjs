import template from './template.mjs';
import { TAO } from "./tao.mjs";

class TlTao extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render() {
        const tao = this.#tao;
        this.shadowRoot.getElementById('chapter').textContent = "Chapter " + tao.number;
        this.shadowRoot.getElementById('tao').innerHTML = tao.chapter;

        return tao.number;
    }

    get #tao() {
        const number = this.#getRandomInteger(0, TAO.length - 1);
        return { number: number + 1, chapter: TAO[number]};
    }

    #getRandomInteger(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}

customElements.define("tl-tao", TlTao);