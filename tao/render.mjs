import Tao from "./tao.mjs";

export function renderTao() {
    const tao = Tao();
    document.getElementById('chapter').textContent = "Chapter " + tao.number;
    document.getElementById('tao').innerHTML = tao.chapter;

    return tao.number;
}