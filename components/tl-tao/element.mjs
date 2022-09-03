import template from './template.mjs';
import { getRandomInteger } from '/components/tl-body/utils.mjs';
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
        const number = getRandomInteger(0, TAO.length - 1);
        return { number: number + 1, chapter: TAO[number]};
    }
}

customElements.define("tl-tao", TlTao);