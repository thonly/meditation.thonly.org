import template from './template.mjs';

class TlSynodic extends HTMLElement {
    #timer;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.start();
    }

    render() {
        this.shadowRoot.getElementById('synodic').textContent = new Date().toLocaleTimeString();
    }

    start() {
        this.#timer = setInterval(this.render.bind(this), 1000);
    }

    stop() {
        clearInterval(this.#timer);
    }
}

customElements.define("tl-synodic", TlSynodic);