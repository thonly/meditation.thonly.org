import { getRandomInteger } from "../utils.mjs";
// https://en.wikipedia.org/wiki/Rider%E2%80%93Waite_tarot_deck

export function getMajorArcana() {
    return { orientation: getRandomInteger(0, 1), card: `datastore/tarot/major/${getRandomInteger(0, 21)}.jpeg` };
}

export function getMinorArcana() {
    const suits = ['cups', 'pentacles', 'swords', 'wands'];
    return { orientation: getRandomInteger(0, 1), card: `datastore/tarot/minor/${suits[getRandomInteger(0, 3)]}/${getRandomInteger(1, 14)}.jpeg` };
}