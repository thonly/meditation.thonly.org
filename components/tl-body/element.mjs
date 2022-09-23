class TlBody extends HTMLBodyElement {
    #store = {
        birth: {
            date: null,
            place: null,
            latitude: null,
            longitude: null
        },
        current: {
            date: new Date(),
            place: "Fresno, CA",
            latitude: 36.7484271,
            longitude: -119.7915444
        }
    };

    #body;
    #timer;
    #minutes;
    #hours;

    #synodicElement;
    #siderealElement;
    #locationElement;
    #birthElement;
    #horoscopeElement;
    #moonElement;

    #musicElement;
    #numerologyElement;
    #tarotElement;
    #ichingElement;
    #taoElement;
    #platonicElement;

    constructor() {
        const body = super();
        this.#body = body;
        this.#synodicElement = this.#body.querySelector('tl-synodic');
        this.#siderealElement = this.#body.querySelector('tl-sidereal');
        this.#locationElement = this.#body.querySelector('tl-location');
        this.#birthElement = this.#body.querySelector('tl-birth');
        this.#horoscopeElement = this.#body.querySelector('tl-horoscope');
        this.#moonElement = this.#body.querySelector('tl-moon');

        this.#musicElement = this.#body.querySelector('tl-music');
        this.#tarotElement = this.#body.querySelector('tl-tarot');
        this.#numerologyElement = this.#body.querySelector('tl-numerology');
        this.#ichingElement = this.#body.querySelector('tl-iching');
        this.#taoElement = this.#body.querySelector('tl-tao');
        this.#platonicElement = this.#body.querySelector('tl-platonic');
    }

    connectedCallback() {
        this.#connect();
        navigator.geolocation.getCurrentPosition(position => this.#createStore(position), error => this.#createStore());
    }

    #connect() {
        this.#body.addEventListener('tl-location', event => this.#astroReducer(event.detail));
        this.#body.addEventListener('tl-birth', event => this.#astroReducer(event.detail));
        this.#body.addEventListener('tl-timer', event => this.#musicReducer(event.detail));
    }

    #createStore(position) {
        this.#updateCurrent(position)
        this.#updateBirth();
        this.#birthElement.render(this.#store.birth);
        this.#horoscopeElement.createNatalChart(this.#store);
        this.start();
    }

    #updateCurrent(position={coords: {latitude: null, longitude: null}}) {
        this.#store = JSON.parse(localStorage.getItem('store')) || this.#store;
        this.#store.birth.date = typeof this.#store.birth.date === "string" ? new Date(this.#store.birth.date) : this.#store.birth.date;
        this.#store.current.date = typeof this.#store.current.date === "string" ? new Date(this.#store.current.date) : this.#store.current.date;
        this.#store.current.latitude = position.coords.latitude || this.#store.current.latitude;
        this.#store.current.longitude = position.coords.longitude || this.#store.current.longitude;
    }

    #updateBirth(date=null, position={latitude: null, longitude: null}, place=null) {
        this.#store.birth.date = date || this.#store.birth.date || this.#store.current.date;
        this.#store.birth.latitude = position.latitude || this.#store.birth.latitude || this.#store.current.latitude;
        this.#store.birth.longitude = position.longitude || this.#store.birth.longitude || this.#store.current.longitude;
        this.#store.birth.place = place || this.#store.birth.place || null;
        localStorage.setItem('store', JSON.stringify(this.#store));
    }

    #astroReducer({ action, data }) {
        switch (action) {
            case "place":
                if (!this.#store.birth.place) {
                    this.#store.birth.place = data;
                    this.#birthElement.render(this.#store.birth);
                }
                this.#store.current.place = data;
                localStorage.setItem('store', JSON.stringify(this.#store));
                break;
            case "birth":
                const { date, position, place } = data;
                this.#updateBirth(date, position, place);
                this.#horoscopeElement.createNatalChart(this.#store);
                break;
        }        
    }

    #musicReducer({ action, data }) {
        switch (action) {
            case "start":
                const date = new Date();
                this.#musicElement.play();
                this.#numerologyElement.render(date.getFullYear(), date.getMonth(), date.getDate(), this.#tarotElement.render(), this.#ichingElement.render(), this.#taoElement.render(), this.#platonicElement.render());
                this.#numerologyElement.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
                break;
            case "tick":
                this.#musicElement.tick(data.timerDuration, data.alarmDuration);
                break;
            case "alarm":
                this.#musicElement.pause();
                break;
            case "stop":
                this.#musicElement.stop();
                this.#platonicElement.stop();
                break;
            default:
                this.#musicElement[action]();
                break;
        }
    }

    render() {
        this.#synodicElement.render();
        this.#siderealElement.render(this.#store.current);
        this.#horoscopeElement.render(this.#store.current);

        const date = new Date();
        const minutes = date.getMinutes();
        const hours = date.getHours();

        if (this.#minutes !== minutes) {
            this.#locationElement.render(this.#store.current);
            this.#minutes = minutes;
        }
        if (this.#hours !== hours) {
            this.#moonElement.render(date);
            this.#hours = hours;
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