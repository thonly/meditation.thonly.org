import template from './template.mjs';
import { getRandomInteger } from '/components/tl-body/utils.mjs';
import { viewBoxWidth, solids, solidsData } from './solid.mjs';

class TlPlatonic extends HTMLElement {
    #solid;
    #animation;
    #forward = 1; // or -1

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    render() {
        const solid = getRandomInteger(0, 3);
        if (this.#solid) this.#solid.style.display = 'none';
        if (this.#animation) cancelAnimationFrame(this.#animation);

        this.#solid = this.shadowRoot.getElementById(solids[solid].name);
        this.#solid.style.display = 'block';
        this.#solid.firstElementChild.style.stroke = solids[solid].color;
        this.#animation = requestAnimationFrame(this.#animate.bind(this, this.#solid)); // second parameter not necessary but good to know it's possible!

        this.shadowRoot.getElementById('solid').textContent = solids[solid].name;
        this.shadowRoot.getElementById('solid').style.color = solids[solid].color;
        this.shadowRoot.getElementById('element').textContent = solids[solid].element;
        this.shadowRoot.getElementById('element').style.color = solids[solid].color;

        return solid;
    }

    stop() {
        cancelAnimationFrame(this.#animation);
    }

    connectedCallback() {
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("viewBox", `-20 -20 ${viewBoxWidth} ${viewBoxWidth}`);        

        [...this.shadowRoot.querySelector('section').children].forEach(solid => {
            solid.appendChild(svg.cloneNode(true));
            this.#render(solid);
        });
    }

    #createFaces(name, num) {
        const newPolygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        newPolygon.setAttribute(
            "points",
            solidsData[name].faces[num]
                .map((e) => solidsData[name].vertices[e])
                .map(([x, y, _z]) => [x, y])
                .toString()
        );
        return newPolygon;
    }

    #render(solid) {
        const targetSvg = solid.firstElementChild;
        targetSvg.innerHTML = "";
        solidsData[solid.id].faces.forEach((_x, i) =>
            targetSvg.appendChild(this.#createFaces(solid.id, i))
        );
    }

    #rotate(name, deg) {
        const clc = (Math.PI / 180) * deg;
        const cos = Math.cos(clc);
        const sin = Math.sin(clc);
        solidsData[name].vertices = solidsData[name].vertices.map(([x, y, z]) => [
            x,
            cos * y - sin * z,
            sin * y + cos * z
        ]); // rotate on x axis
        solidsData[name].vertices = solidsData[name].vertices.map(([x, y, z]) => [
            cos * x - sin * y,
            sin * x + cos * y,
            z
        ]); // rotate on z axis
    }

    #animate(solid, timestamp) {
        this.#rotate(solid.id, this.#forward);
        this.#render(solid);
        //console.log(timestamp);
        this.#animation = requestAnimationFrame(this.#animate.bind(this, solid));
    }

    #animate2() {
        this.#animation = setInterval(() => {
            this.#rotate(this.#solid.id, this.#forward);
            this.#render(this.#solid);
        }, 100);
    }

    #render2() {
        const iframe = this.shadowRoot.querySelector('iframe');
        iframe.style.display = 'block';
        const solid = getRandomInteger(0, 4);
        iframe.contentWindow.document.getElementById('solid').value = solid;
        iframe.contentWindow.document.getElementById('color').value = solid;
        return solid;
    }
}

customElements.define("tl-platonic", TlPlatonic);