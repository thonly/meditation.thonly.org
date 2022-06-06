import { getFormattedDuration, getDigitalRoot } from '/utils.mjs';
import { createNatalChart } from '/astro/chart.mjs';
import { renderAstro } from '/astro/render.mjs';
import { renderTarot } from '/tarot/render.mjs'; 
import { renderTao } from '/tao/render.mjs';
import { playAlarm } from '/music/alarm.mjs';

let timer = null;
let button = null;
const timerElement = document.getElementById('timer');

window.startTimer = (element, minutes=0) => {
    clearInterval(timer);
    timerElement.style.color = 'black';
    element.disabled = true;
    if (button) button.disabled = false;
    button = element;
    
    const startTime = new Date();
    const numerology = document.getElementById('numerology');
    numerology.textContent = getDigitalRoot(startTime.getFullYear() + startTime.getMonth() + startTime.getDate() + renderTarot() + renderTao());
    numerology.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
    
    const alarmDuration = getFormattedDuration(minutes*60);
    timer = setInterval(() => {
        const timerDuration = getFormattedDuration((new Date() - startTime) / 1000);
        timerElement.textContent = timerDuration;
        if (timerDuration === alarmDuration) {
            playAlarm();
            timerElement.style.color = 'red';
            //button.disabled = false;
        }
    }, 1000);
};

window.pauseTimer = () => {

};

window.stopTimer = () => {
    clearInterval(timer);
    button.disabled = false;
    //timerElement.style.color = 'black';
    //playAlarm();
};

window.onload = () => {
    createNatalChart('horoscope');
    setInterval(renderAstro, 1000);
};

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KMZJNVG8GT');