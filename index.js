import { getFormattedDuration, getDigitalRoot } from '/utils.mjs';
import { renderAstro, setBirth } from '/astro/render.mjs';
import { renderTarot } from '/tarot/render.mjs'; 
import { renderTao } from '/tao/render.mjs';
import { playAlarm } from '/music/alarm.mjs';

let timer = null;
let startButton = null;
let startTime = null;
let pauseDuration = null;
let alarmDuration = null;
let playing = true;
const timerElement = document.getElementById('timer');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');

window.startTimer = (element, minutes=0) => {
    clearInterval(timer);
    timerElement.style.color = 'black';
    pauseButton.disabled = false;
    stopButton.disabled = false;
    playing = true;
    pauseButton.textContent = "Pause";
    element.disabled = true;
    if (startButton) startButton.disabled = false;
    startButton = element;
    
    startTime = new Date();
    const numerology = document.getElementById('numerology');
    numerology.textContent = getDigitalRoot(startTime.getFullYear() + startTime.getMonth() + startTime.getDate() + renderTarot() + renderTao());
    numerology.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
    
    alarmDuration = getFormattedDuration(minutes*60);
    runTimer(startTime, alarmDuration);
};

function runTimer(startTime, alarmDuration) {
    timer = setInterval(() => {
        const timerDuration = getFormattedDuration((new Date() - startTime) / 1000);
        timerElement.textContent = timerDuration;
        if (timerDuration === alarmDuration) {
            playAlarm();
            timerElement.style.color = 'red';
            //startButton.disabled = false;
        }
    }, 1000);
}

window.pauseTimer = element => {
    if (playing) {
        pauseDuration = new Date() - startTime;
        clearInterval(timer);
        playing = false;
        element.textContent = "Resume";
    } else {
        startTime = new Date() - pauseDuration;
        runTimer(startTime, alarmDuration);
        playing = true;
        element.textContent = "Pause";
    }
};

window.stopTimer = element => {
    //playAlarm();
    clearInterval(timer);
    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    playing = false;
    pauseButton.textContent = "Pause";
    //timerElement.style.color = 'black';
};

window.setBirth = setBirth;
window.onload = () => navigator.geolocation.getCurrentPosition(position => renderAstro(position));

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KMZJNVG8GT');