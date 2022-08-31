import template from './template.mjs';

class TlLocation extends HTMLElement {
    #timer;

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        //this.start();
        //console.log(this.weather)
    }

    async render() {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${localStorage.getItem('current-latitude')}&lon=${localStorage.getItem('current-longitude')}&units=imperial&appid=1356b68f4f9d57c3ee9c6733e41d3e34`);
        const weather = await response.json();
        this.shadowRoot.getElementById('location').innerHTML = `${weather.name} | ${weather.main.feels_like}° | <span id="temp-max">${weather.main.temp_max}°</span> | <span id="temp-min">${weather.main.temp_min}°</span>`;
        this.dispatchEvent(new CustomEvent("tl-location", { bubbles: true, composed: true, detail: { weather }}));
    }

    start() {
        this.#timer = setInterval(this.render.bind(this), 1000*60); // api limit: 60 calls per minute
    }

    stop() {
        clearInterval(this.#timer);
    }
}

customElements.define("tl-location", TlLocation);