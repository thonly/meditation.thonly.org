import { getFormattedDuration, getDigitalRoot } from '/utils.mjs';
import { renderAstro, setBirth } from '/astro/render.mjs';
import { renderTarot } from '/tarot/render.mjs'; 
import { renderTao } from '/tao/render.mjs';
import { randomColor, playAlarm, playScaleInOrder, playScaleRandom, playMusic } from '/music/sound.mjs';

let timer = null;
let startButton = null;
let startTime = null;
let pauseDuration = null;
let alarmDuration = null;
let playing = true;
let ballad = null;
const timerElement = document.getElementById('timer');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const musicOption = document.getElementById('music');

window.startTimer = (element, minutes=0) => {
    clearInterval(timer);
    timerElement.style.color = 'green';
    pauseButton.disabled = false;
    stopButton.disabled = false;
    musicOption.disabled = true;
    playing = true;
    pauseButton.textContent = "Pause";
    element.disabled = true;
    if (startButton) startButton.disabled = false;
    startButton = element;
    
    startTime = new Date();
    const numerology = document.getElementById('numerology');
    numerology.textContent = getDigitalRoot(startTime.getFullYear() + startTime.getMonth() + startTime.getDate() + renderTarot() + renderTao());
    numerology.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
    
    ballad = playMusic();
    alarmDuration = getFormattedDuration(minutes*60);
    runTimer(startTime, alarmDuration);
};

function runTimer(startTime, alarmDuration) {
    timer = setInterval(() => {
        const timerDuration = getFormattedDuration((new Date() - startTime) / 1000);
        timerElement.textContent = timerDuration;

        if (timerDuration === alarmDuration) {
            timerElement.style.color = 'red';
            //startButton.disabled = false;
            if (ballad) ballad.pause();
        }

        switch (musicOption.value) {
            case "silence":
                break;
            case "alarm":
                document.body.style.backgroundColor = randomColor();
                if (timerDuration === alarmDuration) playAlarm();
                break;
            case "uniaural":
                if (timerDuration < alarmDuration) document.body.style.backgroundColor = alarmDuration < "01:00:00" ? playScaleInOrder() : playScaleRandom();
                break;
            case "binaural":
                if (timerDuration < alarmDuration) document.body.style.backgroundColor = alarmDuration < "01:00:00" ? playScaleInOrder() : playScaleRandom();
                break;
            default:
                document.body.style.backgroundColor = randomColor();
                break;
        }

    }, 1000);
}

window.pauseTimer = element => {
    if (playing) {
        pauseDuration = new Date() - startTime;
        clearInterval(timer);
        playing = false;
        element.textContent = "Resume";
        if (ballad) ballad.pause();
    } else {
        startTime = new Date() - pauseDuration;
        runTimer(startTime, alarmDuration);
        playing = true;
        element.textContent = "Pause";
        if (ballad) ballad.play();
    }
};

window.stopTimer = element => {
    //playAlarm();
    clearInterval(timer);
    startButton.disabled = false;
    pauseButton.disabled = true;
    stopButton.disabled = true;
    musicOption.disabled = false;
    playing = false;
    pauseButton.textContent = "Pause";
    document.body.style.backgroundColor = 'white';
    timerElement.style.color = 'black';
    if (ballad) ballad.pause();
};

window.setBirth = setBirth;
window.onload = () => navigator.geolocation.getCurrentPosition(position => renderAstro(position), error => renderAstro({coords: {latitude: null, longitude: null}}));

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KMZJNVG8GT');