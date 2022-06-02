import { getRandomInteger } from "/utils.mjs";
// https://en.wikipedia.org/wiki/Rider%E2%80%93Waite_tarot_deck

export function renderTarot() {
    const major = document.getElementById('major');
    const minor = document.getElementById('minor');
    const majorArcanus = getMajorArcana();
    const minorArcanus = getMinorArcana();
    major.src = majorArcanus.card;
    minor.src = minorArcanus.card;
    major.style.transform = `rotate(${ majorArcanus.orientation ? 180 : 0 }deg)`;
    minor.style.transform = `rotate(${ minorArcanus.orientation ? 180 : 0 }deg)`;
    major.scrollIntoView({ behavior: "smooth", block: "start", inline: "center" });
}

function getMajorArcana() {
    return { orientation: getRandomInteger(0, 1), card: `tarot/major/${getRandomInteger(0, 21)}.jpeg` };
}

function getMinorArcana() {
    const suits = ['cups', 'pentacles', 'swords', 'wands'];
    return { orientation: getRandomInteger(0, 1), card: `tarot/minor/${suits[getRandomInteger(0, 3)]}/${getRandomInteger(1, 14)}.jpeg` };
}
