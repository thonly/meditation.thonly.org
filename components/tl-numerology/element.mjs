import template from './template.mjs';

class TlNumerology extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(...numbers) {
        const numerology = this.shadowRoot.getElementById('numerology');
        numerology.textContent = this.#getDigitalRoot(numbers.reduce((sum, number) => sum + number));
        numerology.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
    }

    #getDigitalRoot(number) {
        let sum = number
        let arr = []
        let reducer = (a,b) => parseInt(a) + parseInt(b)
     
        while (sum > 9) {
           arr = sum.toString().split("")
           sum = arr.reduce(reducer)
        }
     
        return sum
    }
}

customElements.define("tl-numerology", TlNumerology);