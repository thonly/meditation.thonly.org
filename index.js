import { createNatalChart, animateTransit } from './astro/chart.mjs';
import { getDuration } from './astro/timer.mjs';
import { renderTarot, renderTao } from './datastore/render.mjs'; 

let timer = null;

window.startTimer = (minutes=0) => {
    renderTarot();
    renderTao();

    const startTime = new Date();
    const alarmTime = new Date(startTime.getTime() + minutes*60000);
    clearInterval(timer);
    timer = setInterval(() => {
        document.getElementById('timer').textContent = getDuration(startTime);
        if (new Date() === alarmTime) console.log("ALARM!");
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

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KMZJNVG8GT');