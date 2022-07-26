import IChing from "./hexagrams.mjs";

export function renderIChing() {
    const iching = IChing();
    document.getElementById('iching').textContent = iching.hexagram.meaning;
    document.getElementById('hexagram').textContent = iching.hexagram.figure;

    return iching.number;
}