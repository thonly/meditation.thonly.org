import template from './template.mjs';
//https://en.wikipedia.org/wiki/Lunar_phase#:~:text=A%20first%20quarter%20moon%20appears,lowest%20on%20the%20spring%20equinox.
// TODO: later https://codepen.io/brunsnik/pen/DwMmem
class TlMoon extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render(date=new Date()) {
        const moon = this.#phase(date.getFullYear(), date.getMonth(), date.getDate());
        this.shadowRoot.getElementById('moon').src = moon.image;
        this.shadowRoot.getElementById('moon').style.display = 'block';
        this.shadowRoot.getElementById('phase').textContent = moon.description;
    }

    #phase(year, month, day) {
        let c = 0, e = 0, jd = 0, b = 0;

        if (month < 3) {
            year--;
            month += 12;
        }

        ++month;
        c = 365.25 * year;
        e = 30.6 * month;
        jd = c + e + day - 694039.09; //jd is total days elapsed
        jd /= 29.5305882; //divide by the moon cycle
        b = parseInt(jd); //int(jd) -> b, take integer part of jd
        jd -= b; //subtract integer part to leave fractional part of original jd
        b = Math.round(jd * 8); //scale fraction from 0-8 and round

        if (b >= 8 ) {
            b = 0; //0 and 8 are the same so turn 8 into 0
        }

        // 0 => New Moon
        // 1 => Waxing Crescent Moon
        // 2 => First Quarter Moon
        // 3 => Waxing Gibbous Moon
        // 4 => Full Moon
        // 5 => Waning Gibbous Moon
        // 6 => Last Quarter Moon
        // 7 => Waning Crescent Moon
        
        return this.#moon(b);
    }

    #moon(phase) {
        const phases = ['New Moon', 'Waxing Crescent Moon', 'First Quarter Moon', 'Waxing Gibbous Moon', 'Full Moon', 'Waning Gibbous Moon', 'Last Quarter Moon', 'Waning Crescent Moon'];
        return { phase, description: phases[phase], image: `components/tl-moon/moon/${phase}.${phase === 0 ? 'gif':'jpeg'}` };
    }
}

customElements.define("tl-moon", TlMoon);