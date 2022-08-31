import template from './template.mjs';

class TlBirth extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.getElementById('birth-button').onclick = this.setBirth.bind(this);
        if (localStorage.getItem('birth-place')) this.render();
    }

    render() {
        this.shadowRoot.getElementById('birth-date').value = `${localStorage.getItem('birth-year')}-${String(+localStorage.getItem('birth-month')+1).padStart(2, '0')}-${String(localStorage.getItem('birth-day')).padStart(2, '0')}T${String(localStorage.getItem('birth-hour')).padStart(2, '0')}:${String(localStorage.getItem('birth-minute')).padStart(2, '0')}`;
        this.shadowRoot.getElementById('birth-place').value = localStorage.getItem('birth-place');
    }

    async setBirth() {
        const date = new Date(this.shadowRoot.getElementById('birth-date').value);
        const place = this.shadowRoot.getElementById('birth-place');
        
        const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(place.value)}&limit=5&appid=1356b68f4f9d57c3ee9c6733e41d3e34`);
        const location = await response.json();
    
        place.value = location[0].name + ", " + location[0].country;
        this.dispatchEvent(new CustomEvent("tl-birth", { bubbles: true, composed: true, detail: { date, place: place.value, position: {latitude: location[0].lat, longitude: location[0].lon} }}));
    }
}

customElements.define("tl-birth", TlBirth);