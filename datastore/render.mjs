import { getMajorArcana, getMinorArcana } from "./tarot/tarot.mjs";
import Tao from "./tao.mjs";

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

export function renderTao() {
    const tao = Tao();
    document.getElementById('chapter').textContent = "Chapter " + tao.number;
    document.getElementById('tao').innerHTML = tao.chapter;
}