import template from './template.mjs';
import { getRandomInteger } from '/components/tl-body/utils.mjs';
//https://en.wikipedia.org/wiki/Rider%E2%80%93Waite_tarot_deck

class TlTarot extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render() {
        const major = this.shadowRoot.getElementById('major');
        const minor = this.shadowRoot.getElementById('minor');
        const majorArcanus = this.#majorArcana;
        const minorArcanus = this.#minorArcana;
        major.src = majorArcanus.card;
        minor.src = minorArcanus.card;
        major.style.transform = `rotate(${ majorArcanus.orientation ? 0 : 180 }deg)`;
        minor.style.transform = `rotate(${ minorArcanus.orientation ? 0 : 180 }deg)`;
        major.style.display = 'block';
        minor.style.display = 'block';
    
        return majorArcanus.number + minorArcanus.number;
    }
    
    //#FIXME: later use relative path
    get #majorArcana() {
        const orientation = getRandomInteger(0, 1);
        const number = getRandomInteger(0, 21);
        return { orientation, number: orientation ? number: -number, card: `components/tl-tarot/major/${number}.jpeg` };
    }
    
    get #minorArcana() {
        const orientation = getRandomInteger(0, 1);
        const suits = ['wands', 'pentacles', 'swords', 'cups'];
        const suit = getRandomInteger(0, 3);
        const number = getRandomInteger(1, 14);
        return { orientation, number: orientation ? suit + number : -suit-number, card: `components/tl-tarot/minor/${suits[suit]}/${number}.jpeg` };
    }
}

customElements.define("tl-tarot", TlTarot);