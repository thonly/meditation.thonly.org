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

/*
BOLLYWOOD
1. Atif Aslam - Gima Award 2015
2. Ae Dil Hai Mushkil - Title Track
3. Agent Vinod - Raabta
4. Arijit Singh - Gima Award 2015
5. Arijit Singh - Soulful Performance Mirchi Music Awards
6. Arijit Singh - Tum Hi Ho
7. Armaan Malik - Main Rahoon Ya Na Rahoon
8. Badlapur - Jeena Jeena
9. Emraan Hashmi - Hamari Adhuri Kahan
10. Hai-Junoon
11. New York - Tune Jo Na Kahan
12. Rockstar - Kun Faya Kun
13. Tamasha - Tum Saath Ho
14. Yeh Jawaani Hai Deewani - Dilliwali Girlfriend
15. Yeh Jawaani Hai Deewani - Kabira
16. Yeh Jawaani Hai Deewani - SubhanAllah
*/

function playBrahminKiitos() {
    const ballad = new Audio(`music/bollywood/1.mp3`);
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
        case "sisamuth":
            return null;
        case "thonly":
            return null;
    }
}