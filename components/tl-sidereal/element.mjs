import "./LST.min.js";
import template from './template.mjs';

class TlSidereal extends HTMLElement {
    #timer;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        //this.start();
    }

    render(current) {
        this.shadowRoot.getElementById('sidereal').textContent = LST.getLST(current.longitude);
    }

    start() {
        this.#timer = setInterval(this.render.bind(this), 1000);
    }

    stop() {
        clearInterval(this.#timer);
    }
}

customElements.define("tl-sidereal", TlSidereal);