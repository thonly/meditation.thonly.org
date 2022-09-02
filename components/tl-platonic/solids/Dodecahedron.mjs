import Solid from "./Solid.mjs";

// shortcuts for Math.
const mrandom = Math.random;
const mfloor = Math.floor;
const mround = Math.round;
const mceil = Math.ceil;
const mabs = Math.abs;
const mmin = Math.min;
const mmax = Math.max;

const mPI = Math.PI;
const mPIS2 = Math.PI / 2;
const mPIS3 = Math.PI / 3;
const m2PI = Math.PI * 2;
const m2PIS3 = (Math.PI * 2) / 3;
const msin = Math.sin;
const mcos = Math.cos;
const mtan = Math.tan;
const matan2 = Math.atan2;

const mhypot = Math.hypot;
const msqrt = Math.sqrt;

const rac3 = msqrt(3);
const rac3s2 = rac3 / 2;
//------------------------------------------------------------------------
function Dodecahedron() {
    /* based on the fact that vertices of an icosahedron are on the surface of a cube.
It is easy to calculate the positions on a cube with faces at coordinates -1 and +1
*/

    const phi = (msqrt(5) + 1) / 2;
    const phi1 = phi - 1;

    const vertices = [
    [phi, 0, phi1],
    [phi, 0, -phi1],
    [phi1, phi, 0],
    [-phi1, phi, 0],
    [-phi, 0, phi1],
    [-phi, 0, -phi1],
    [-phi1, -phi, 0],
    [phi1, -phi, 0],
    [0, phi1, phi],
    [0, -phi1, phi],
    [0, phi1, -phi],
    [0, -phi1, -phi],
    [1, 1, 1],
    [-1, 1, 1],
    [-1, -1, 1],
    [1, -1, 1],
    [1, 1, -1],
    [-1, 1, -1],
    [-1, -1, -1],
    [1, -1, -1]
    ];

    const faces = [
    [0, 1, 16, 2, 12],
    [1, 0, 15, 7, 19],
    [2, 3, 13, 8, 12],
    [3, 2, 16, 10, 17],
    [5, 4, 13, 3, 17],
    [4, 5, 18, 6, 14],
    [6, 7, 15, 9, 14],
    [7, 6, 18, 11, 19],
    [8, 9, 15, 0, 12],
    [9, 8, 13, 4, 14],
    [10, 11, 18, 5, 17],
    [11, 10, 16, 1, 19]
    ];

    Solid.call(this, vertices, faces);
}
Dodecahedron.prototype = new Solid();
Dodecahedron.constructor = Dodecahedron;
export default Dodecahedron;