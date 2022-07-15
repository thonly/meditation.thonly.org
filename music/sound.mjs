import { getRandomInteger } from '/utils.mjs';

export function randomColor() {
    return `rgb(${getRandomInteger(0, 255)}, ${getRandomInteger(0, 255)}, ${getRandomInteger(0, 255)})`;
}

export function playAlarm() {
    const audio = new Audio(`music/alarms/${getRandomInteger(1, 13)}.wav`);
    audio.play();
}

let note = 0;
const chakras = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white'];

export function playScaleInOrder() {
    if (note === 8) note = 0;
    const chord = new Audio(`music/cmajor/${++note}.wav`);
    chord.play();
    return chakras[note - 1];
}

export function playScaleRandom() {
    const note = getRandomInteger(1, 8);
    const chord = new Audio(`music/cmajor/${note}.wav`);
    chord.play();
    return chakras[note - 1];
}

function playBrahminKiitos() {
    const ballad = new Audio(`music/thonly/Us-2cMZu0kY.webm`);
    ballad.loop = true;
    ballad.play();
    return ballad;
}

function playBrahminTHonly() {
    const ballad = new Audio(`music/thonly/Us-2cMZu0kY.webm`);
    ballad.loop = true;
    ballad.play();
    return ballad;
}

export function playMusic() {
    switch (document.getElementById('music').value) {
        case "silence":
            return null;
        case "kiitos":
            return playBrahminKiitos();
        case "thonly":
            return playBrahminTHonly();
    }
}