import { createNatalChart, animateTransit } from './chart.mjs';

export async function renderAstro(position) {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();

    localStorage.setItem('birth-year', localStorage.getItem('birth-year') || year);
    localStorage.setItem('birth-month', localStorage.getItem('birth-month') || month);
    localStorage.setItem('birth-day', localStorage.getItem('birth-day') || day);
    localStorage.setItem('birth-hour', localStorage.getItem('birth-hour') || hour);
    localStorage.setItem('birth-minute', localStorage.getItem('birth-minute') || minute);

    localStorage.setItem('current-latitude', position.coords.latitude);
    localStorage.setItem('current-longitude', position.coords.longitude);
    localStorage.setItem('birth-latitude', localStorage.getItem('birth-latitude') || position.coords.latitude);
    localStorage.setItem('birth-longitude', localStorage.getItem('birth-longitude') || position.coords.longitude);

    const weather = await getWeather();
    localStorage.setItem('birth-place', localStorage.getItem('birth-place') || weather.name + ", " + weather.sys.country);
    document.getElementById('birth-date').value = `${localStorage.getItem('birth-year')}-${String(+localStorage.getItem('birth-month')+1).padStart(2, '0')}-${String(localStorage.getItem('birth-day')).padStart(2, '0')}T${String(localStorage.getItem('birth-hour')).padStart(2, '0')}:${String(localStorage.getItem('birth-minute')).padStart(2, '0')}`;
    document.getElementById('birth-place').value = localStorage.getItem('birth-place');
    
    createNatalChart('horoscope');
    setInterval(getAstro, 1000);
    setInterval(getWeather, 1000*60); 
}

// api limit: 60 calls per minute
async function getWeather() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${localStorage.getItem('current-latitude')}&lon=${localStorage.getItem('current-longitude')}&units=imperial&appid=1356b68f4f9d57c3ee9c6733e41d3e34`);
    const weather = await response.json();
    document.getElementById('location').textContent = weather.name + " | " + weather.main.feels_like + "°";
    return weather;
}

function getAstro() {
    document.getElementById('synodic').textContent = new Date().toLocaleTimeString();
    document.getElementById('sidereal').textContent = LST.getLST(localStorage.getItem('current-longitude'));
    const { Sun, Moon, Earth } = animateTransit();
    document.getElementById('sun-sign').textContent = Sun.Sign.label + " in " + Sun.House.label;
    document.getElementById('moon-sign').textContent = Moon.Sign.label + " in " + Moon.House.label;
    document.getElementById('earth-as').textContent = Earth.As.Sign.label + " Ascendant";
    document.getElementById('earth-mc').textContent = Earth.Mc.Sign.label + " Midheaven";
}

export async function setBirth() {
    const date = new Date(document.getElementById('birth-date').value);
    const place = document.getElementById('birth-place');
    
    const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(place.value)}&limit=5&appid=1356b68f4f9d57c3ee9c6733e41d3e34`);
    const location = await response.json();

    localStorage.setItem('birth-year', date.getFullYear());
    localStorage.setItem('birth-month', date.getMonth());
    localStorage.setItem('birth-day', date.getDate());
    localStorage.setItem('birth-hour', date.getHours());
    localStorage.setItem('birth-minute', date.getMinutes());

    place.value = location[0].name + ", " + location[0].country;
    localStorage.setItem('birth-place', place.value);
    localStorage.setItem('birth-latitude', location[0].lat);
    localStorage.setItem('birth-longitude', location[0].lon);

    document.getElementById('horoscope').replaceChildren();
    createNatalChart('horoscope');
};