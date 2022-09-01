import template from './template.mjs';

import { getDigitalRoot } from '/utils.mjs';
import { renderTarot } from '/tarot/render.mjs'; 
import { renderTao } from '/tao/render.mjs';
import { renderIChing } from '/iching/render.mjs';

class TlLocation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render() {
        const numerology = document.getElementById('numerology');
        numerology.textContent = getDigitalRoot(startTime.getFullYear() + startTime.getMonth() + startTime.getDate() + renderTarot() + renderTao() + renderIChing());
        numerology.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
    }
}

customElements.define("tl-location", TlLocation);