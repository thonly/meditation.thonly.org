import "./Astro.min.js";
import template from './template.mjs';
const { Origin, Horoscope } = Astro;

//TODO: later refactor AstroChart to work with web component
class TlHoroscope extends HTMLElement {
    #timer; 
    #horoscope;
    #id = "horoscope";

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        //this.start();
    }

    render(current) {
        current.date = new Date();
        const { Sun, Moon, Earth } = this.#animateTransit(current);
        this.shadowRoot.getElementById('sun-sign').textContent = Sun.Sign.label + " in " + Sun.House.label;
        this.shadowRoot.getElementById('moon-sign').textContent = Moon.Sign.label + " in " + Moon.House.label;
        this.shadowRoot.getElementById('earth-as').textContent = Earth.As.Sign.label + " Ascendant";
        this.shadowRoot.getElementById('earth-mc').textContent = Earth.Mc.Sign.label + " Midheaven";
    }

    start() {
        this.#timer = setInterval(this.render.bind(this), 1000);
    }

    stop() {
        clearInterval(this.#timer);
    }

    createNatalChart(store) {
        const { planets, cusps, As, Ds, Mc, Ic, Sun, Moon, Earth } = this.#getHoroscope(store.birth);
        const transit = this.#getHoroscope(store.current);
        
        const element = this.querySelector('#' + this.#id);
        element.replaceChildren();
        const width = element.offsetWidth < 500 ? element.offsetWidth : 500;
        const chart = new astrology.Chart(this.#id, width, width);
        const radix = chart.radix({ planets, cusps });
        radix.addPointsOfInterest({ As, Mc, Ds, Ic });
        this.#horoscope = radix.transit({ planets: transit.planets, cusps: transit.cusps }).aspects();
    
        return { natal: { Sun, Moon, Earth }, transit: { Sun: transit.Sun, Moon: transit.Moon, Earth: transit.Earth } };
    }
    
    #animateTransit(current) {
        const { planets, cusps, Sun, Moon, Earth } = this.#getHoroscope(current);
        
        this.#horoscope.animate({ planets, cusps }, 1, false, () => {
            //console.log("Animation finished");
        });

        return { Sun, Moon, Earth };
    }

    #getHoroscope({ date, latitude, longitude }) {
        const origin = new Origin({
            year: date.getFullYear(),
            month: date.getMonth(),
            date: date.getDate(),
            hour: date.getHours(),
            minute: date.getMinutes(),
            latitude, 
            longitude
        });
      
        const horoscope = new Horoscope({
            origin,
            houseSystem: "whole-sign",
            zodiac: "tropical",
            aspectPoints: ['bodies', 'points', 'angles'],
            aspectWithPoints: ['bodies', 'points', 'angles'],
            aspectTypes: ["major", "minor"],
            customOrbs: {},
            language: 'en'
        });
      
        return this.#getData(horoscope);
    }

    #getData(horoscope) {
        const data = {};
      
        data.planets = Object.assign(
            {},
            ...horoscope._celestialBodies.all.map((body) => {
                const key = body.key.charAt(0).toUpperCase() + body.key.slice(1);
                return { [key]: [body.ChartPosition.Ecliptic.DecimalDegrees] };
            })
        );
      
        data.cusps = horoscope._houses.map((cusp) => {
            return cusp.ChartPosition.StartPosition.Ecliptic.DecimalDegrees;
        });
      
        data.As = [horoscope._ascendant.ChartPosition.Horizon.DecimalDegrees];
        data.Ds = [(data.As + 180) % 360];
        data.Mc = [horoscope._midheaven.ChartPosition.Horizon.DecimalDegrees];
        data.Ic = [(horoscope._midheaven.ChartPosition.Horizon.DecimalDegrees + 180) % 360];
      
        data.Sun = horoscope.CelestialBodies.sun;
        data.Moon = horoscope.CelestialBodies.moon;
        data.Earth = { As: horoscope.Ascendant, Mc: horoscope.Angles.midheaven };
      
        return data;
      }
}

customElements.define("tl-horoscope", TlHoroscope);