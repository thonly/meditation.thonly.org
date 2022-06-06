import { getRandomInteger } from "/utils.mjs";
// https://en.wikipedia.org/wiki/Rider%E2%80%93Waite_tarot_deck

export function renderTarot() {
    const major = document.getElementById('major');
    const minor = document.getElementById('minor');
    const majorArcanus = getMajorArcana();
    const minorArcanus = getMinorArcana();
    major.src = majorArcanus.card;
    minor.src = minorArcanus.card;
    major.style.transform = `rotate(${ majorArcanus.orientation ? 0 : 180 }deg)`;
    minor.style.transform = `rotate(${ minorArcanus.orientation ? 0 : 180 }deg)`;

    return majorArcanus.number + minorArcanus.number;
}

function getMajorArcana() {
    const orientation = getRandomInteger(0, 1);
    const number = getRandomInteger(0, 21);
    return { orientation, number: orientation ? number: -number, card: `tarot/major/${number}.jpeg` };
}

function getMinorArcana() {
    const orientation = getRandomInteger(0, 1);
    const suits = ['wands', 'pentacles', 'swords', 'cups'];
    const suit = getRandomInteger(0, 3);
    const number = getRandomInteger(1, 14);
    return { orientation, number: orientation ? suit + number : -suit-number, card: `tarot/minor/${suits[suit]}/${number}.jpeg` };
}