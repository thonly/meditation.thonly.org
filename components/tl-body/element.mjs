class TlBody extends HTMLBodyElement {
    #body;
    #timer;
    #minutes;

    constructor() {
        const body = super();
        this.#body = body;
        
        this.synodicElement = this.#body.querySelector('tl-synodic');
        this.siderealElement = this.#body.querySelector('tl-sidereal');
        this.locationElement = this.#body.querySelector('tl-location');
        this.birthElement = this.#body.querySelector('tl-birth');
        this.horoscopeElement = this.#body.querySelector('tl-horoscope');
    }

    connectedCallback() {
        window.navigator.geolocation.getCurrentPosition(position => this.init(position), error => this.init());

        this.#body.addEventListener('tl-location', event => this.initBirth(event.detail.place));
        this.#body.addEventListener('tl-birth', event => {
            this.updateBirth(event.detail.date, event.detail.position, event.detail.place);
            this.horoscopeElement.createNatalChart();
        });
    }

    init(position={coords: {latitude: null, longitude: null}}) {
        this.updateLocation(position);
        this.updateBirth();
        this.horoscopeElement.createNatalChart();
        this.start();
    }

    initBirth(place) {
        if (!localStorage.getItem('birth-place')) {
            localStorage.setItem('birth-place', place);
            this.birthElement.render();
        }
    }

    updateLocation(position) {
        localStorage.setItem('current-latitude', position.coords.latitude || localStorage.getItem('current-latitude') || 36.7854513);
        localStorage.setItem('current-longitude', position.coords.longitude || localStorage.getItem('current-longitude') || -119.9346456);
    }

    updateBirth(date=null, position={latitude: null, longitude: null}, place=null) {
        localStorage.setItem('birth-date', date || localStorage.getItem('birth-date') || new Date().toUTCString());
        localStorage.setItem('birth-latitude', position.latitude || localStorage.getItem('current-latitude'));
        localStorage.setItem('birth-longitude', position.longitude || localStorage.getItem('current-longitude'));
        localStorage.setItem('birth-place', place || localStorage.getItem('birth-place') || "");
    }

    render() {
        this.synodicElement.render();
        this.siderealElement.render();
        this.horoscopeElement.render();

        const minutes = new Date().getMinutes();
        if (this.#minutes !== minutes) {
            this.locationElement.render();
            this.#minutes = minutes;
        }
    }

    start() {
        this.#timer = setInterval(this.render.bind(this), 1000);
    }

    stop() {
        clearInterval(this.#timer);
    }
}

customElements.define('tl-body', TlBody, { extends: 'body' });