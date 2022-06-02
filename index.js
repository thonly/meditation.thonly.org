import { getFormattedTime, getDuration } from '/utils.mjs';
import { createNatalChart } from '/astro/chart.mjs';
import { renderAstro } from '/astro/render.mjs';
import { renderTarot } from '/tarot/render.mjs'; 
import { renderTao } from '/tao/render.mjs';
import { playAlarm } from '/music/alarm.mjs';

let timer = null;

window.startTimer = (minutes=0) => {
    clearInterval(timer);
    renderTarot();
    renderTao();

    const startTime = new Date();
    const alarmTime = getFormattedTime(minutes*60);
    timer = setInterval(() => {
        const duration = getDuration(startTime);
        document.getElementById('timer').textContent = duration;
        if (duration === alarmTime) playAlarm();
    }, 1000);
}

window.stopTimer = () => {
    clearInterval(timer);
    //playAlarm();
}

window.onload = () => {
    createNatalChart('horoscope');
    setInterval(renderAstro, 1000);
};

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KMZJNVG8GT');