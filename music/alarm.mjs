import { getRandomInteger } from '/utils.mjs';

export function playAlarm() {
    const audio = new Audio(`music/alarms/${getRandomInteger(1, 13)}.wav`);
    audio.play();
}