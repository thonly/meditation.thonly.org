import { createNatalChart, animateTransit } from './modules/chart.mjs';
import { getDuration } from './modules/timer.mjs';

let timer = null;

window.startTimer = () => {
    const startTime = new Date();
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