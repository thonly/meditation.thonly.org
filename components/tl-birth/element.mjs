import template from './template.mjs';

class TlBirth extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.getElementById('birth-button').onclick = this.#setBirth.bind(this);
        //if (localStorage.getItem('birth-place')) this.render();
    }

    render(birth) {
        const date = new Date(birth.date);
        this.shadowRoot.getElementById('birth-date').value = `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}T${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        this.shadowRoot.getElementById('birth-place').value = birth.place || "Fresno, CA"; // default city is not required bc will get replaced almost immediately
    }

    async #setBirth() {
        const date = new Date(this.shadowRoot.getElementById('birth-date').value);
        const place = this.shadowRoot.getElementById('birth-place');
        
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(place.value)}&limit=5&appid=1356b68f4f9d57c3ee9c6733e41d3e34`);
        const location = await response.json();
    
        place.value = location[0].name + ", " + location[0].country;
        this.dispatchEvent(new CustomEvent("tl-birth", { bubbles: true, composed: true, detail: { action: "birth", data: { date, place: place.value, position: {latitude: location[0].lat, longitude: location[0].lon} }}}));
    }
}

customElements.define("tl-birth", TlBirth);