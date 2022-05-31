import { createNatalChart, animateTransit } from './astro/chart.mjs';
import { getDuration } from './astro/timer.mjs';
import { getMajorArcana } from './datastore/tarot/tarot.mjs'; 
import Tao from './datastore/tao.mjs';

let timer = null;

window.startTimer = () => {
    const tarot = document.getElementById('tarot');
    tarot.src = getMajorArcana();
    tarot.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });

    const tao = Tao();
    document.getElementById('chapter').textContent = "Chapter " + tao.number;
    document.getElementById('tao').innerHTML = tao.chapter;

    const startTime = new Date();
    clearInterval(timer);
    timer = setInterval(() => {
        document.getElementById('timer').textContent = getDuration(startTime);
    }, 1000);
}

window.stopTimer = () => {
    clearInterval(timer);
}

window.onload = () => {
    createNatalChart('horoscope');
    setInterval(() => {
        document.getElementById('synodic').textContent = new Date().toLocaleTimeString();
        document.getElementById('sidereal').textContent = LST.getLST();
        animateTransit();
    }, 1000);
};