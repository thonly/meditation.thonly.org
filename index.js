import { getFormattedDuration, getDigitalRoot } from '/utils.mjs';
import { getLocation } from './astro/location.mjs';
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
    navigator.geolocation.getCurrentPosition(async (position) => {
        localStorage.setItem('latitude', localStorage.getItem('latitude') || position.coords.latitude);
        localStorage.setItem('longitude', localStorage.getItem('longitude') || position.coords.longitude);

        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=imperial&appid=1356b68f4f9d57c3ee9c6733e41d3e34`);
        const weather = await response.json();
        document.getElementById('location').textContent = weather.name + " | " + weather.main.feels_like + "°";
        createNatalChart('horoscope', localStorage.getItem('latitude'), localStorage.getItem('longitude'));
        setInterval(renderAstro, 1000, position.coords.latitude, position.coords.longitude);
        
        console.log(await getLocation("Kampot, Cambodia"));
    });
};

window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-KMZJNVG8GT');