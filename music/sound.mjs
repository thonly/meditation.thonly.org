import { getRandomInteger } from '/utils.mjs';

export function randomColor() {
    return `rgb(${getRandomInteger(0, 255)}, ${getRandomInteger(0, 255)}, ${getRandomInteger(0, 255)})`;
}

export function playAlarm() {
    const audio = new Audio(`music/alarm/${getRandomInteger(1, 13)}.wav`);
    audio.play();
}

let note = 0;
const chakras = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white'];

// C Major Diatonic Scale
export function playScaleInOrder() {
    if (note === 8) note = 0;
    const chord = new Audio(`music/uniaural/${++note}.wav`);
    chord.play();
    return chakras[note - 1];
}

// C Major Diatonic Scale
export function playScaleRandom() {
    const note = getRandomInteger(1, 8);
    const chord = new Audio(`music/uniaural/${note}.wav`);
    chord.play();
    return chakras[note - 1];
}

function playBinaural() {
    const ballad = new Audio(`music/binaural/${getRandomInteger(1, 4)}.m4a`);
    ballad.loop = true;
    ballad.play(); 
    return ballad;
}

// Chromatic Scale
export function playBrahminKiitos() {
    const note = getRandomInteger(40, 56);
    const chord = new Audio(`music/kiitos/0${note}.wav`);
    chord.play();
    return chakras[Math.floor(note/8)];
}

function playBrahminTHonly() {
    const ballad = new Audio(`music/thonly/${getRandomInteger(1, 1)}.mp3`);
    ballad.loop = true;
    ballad.play();
    return ballad;
}

export function playMusic() {
    switch (document.getElementById('music').value) {
        case "silence":
            return null;
        case "binaural":
            return playBinaural();
        case "kiitos":
            return playBrahminKiitos();
        case "thonly":
            return playBrahminTHonly();
    }
}