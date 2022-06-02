import { animateTransit } from './chart.mjs';

export function renderAstro() {
    document.getElementById('synodic').textContent = new Date().toLocaleTimeString();
    document.getElementById('sidereal').textContent = LST.getLST();
    const { Sun, Moon, Earth } = animateTransit();
    document.getElementById('sun-sign').textContent = Sun.Sign.label + " in " + Sun.House.label;
    document.getElementById('moon-sign').textContent = Moon.Sign.label + " in " + Moon.House.label;
    document.getElementById('earth-as').textContent = Earth.As.Sign.label + " Ascendant";
    document.getElementById('earth-mc').textContent = Earth.Mc.Sign.label + " Midheaven";
}