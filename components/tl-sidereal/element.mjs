import template from './template.mjs';

class TlSidereal extends HTMLElement {
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
        this.shadowRoot.getElementById('sidereal').textContent = LST.getLST(localStorage.getItem('current-longitude'));
    }

    start() {
        this.#timer = setInterval(this.render.bind(this), 1000);
    }

    stop() {
        clearInterval(this.#timer);
    }
}

customElements.define("tl-sidereal", TlSidereal);