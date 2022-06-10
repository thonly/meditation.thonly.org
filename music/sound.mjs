import { getRandomInteger } from '/utils.mjs';

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