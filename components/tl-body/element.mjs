class TlBody extends HTMLBodyElement {
    #body;
    #timer;
    #minutes;

    #synodicElement;
    #siderealElement;
    #locationElement;
    #birthElement;
    #horoscopeElement;

    #musicElement;
    #numerologyElement;
    #tarotElement;
    #ichingElement;
    #taoElement;

    constructor() {
        const body = super();
        this.#body = body;
        this.#synodicElement = this.#body.querySelector('tl-synodic');
        this.#siderealElement = this.#body.querySelector('tl-sidereal');
        this.#locationElement = this.#body.querySelector('tl-location');
        this.#birthElement = this.#body.querySelector('tl-birth');
        this.#horoscopeElement = this.#body.querySelector('tl-horoscope');
        this.#musicElement = this.#body.querySelector('tl-music');

        this.#tarotElement = this.#body.querySelector('tl-tarot');
        this.#numerologyElement = this.#body.querySelector('tl-numerology');
        this.#ichingElement = this.#body.querySelector('tl-iching');
        this.#taoElement = this.#body.querySelector('tl-tao');
    }

    connectedCallback() {
        navigator.geolocation.getCurrentPosition(position => this.#init(position), error => this.#init());

        this.#body.addEventListener('tl-location', event => this.#initBirth(event.detail.place));
        this.#body.addEventListener('tl-birth', event => {
            this.#updateBirth(event.detail.date, event.detail.position, event.detail.place);
            this.#horoscopeElement.createNatalChart();
        });
        this.#body.addEventListener('tl-timer', event => this.#updateMusic(event.detail));
    }

    #init(position={coords: {latitude: null, longitude: null}}) {
        this.#updateLocation(position);
        this.#updateBirth();
        this.#birthElement.render();
        this.#horoscopeElement.createNatalChart();
        this.start();
    }

    #initBirth(place) {
        if (!localStorage.getItem('birth-place')) {
            localStorage.setItem('birth-place', place);
            this.#birthElement.render();
        }
    }

    #updateLocation(position) {
        localStorage.setItem('current-latitude', position.coords.latitude || localStorage.getItem('current-latitude') || 36.7854513);
        localStorage.setItem('current-longitude', position.coords.longitude || localStorage.getItem('current-longitude') || -119.9346456);
    }

    #updateBirth(date=null, position={latitude: null, longitude: null}, place=null) {
        localStorage.setItem('birth-date', date || localStorage.getItem('birth-date') || new Date().toUTCString());
        localStorage.setItem('birth-latitude', position.latitude || localStorage.getItem('current-latitude'));
        localStorage.setItem('birth-longitude', position.longitude || localStorage.getItem('current-longitude'));
        localStorage.setItem('birth-place', place || localStorage.getItem('birth-place') || "");
    }

    #updateMusic(data) {
        switch (data.event) {
            case "start":
                this.#musicElement.play();
                this.#divine();
                break;
            case "tick":
                this.#musicElement.tick(data.timerDuration, data.alarmDuration);
                break;
            case "alarm":
                this.#musicElement.pause();
                break;
            default:
                this.#musicElement[data.event]();
                break;
        }
    }

    #divine() {
        const now = new Date();
        this.#numerologyElement.render(now.getFullYear(), now.getMonth(), now.getDate(), this.#tarotElement.render(), this.#ichingElement.render(), this.#taoElement.render());
    }

    render() {
        this.#synodicElement.render();
        this.#siderealElement.render();
        this.#horoscopeElement.render();

        const minutes = new Date().getMinutes();
        if (this.#minutes !== minutes) {
            this.#locationElement.render();
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