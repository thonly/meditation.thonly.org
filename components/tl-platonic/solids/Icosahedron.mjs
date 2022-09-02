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
function Icosahedron() {
    /* based on the fact that vertices of an icosahedron are on the surface of a cube.
It is easy to calculate the positions on a cube with faces at coordinates -1 and +1
*/

    const nphi = (msqrt(5) - 1) / 2;

    const vertices = [
    [1, 0, nphi],
    [1, 0, -nphi],
    [0, -nphi, 1],
    [0, nphi, 1],
    [-1, 0, -nphi],
    [-1, 0, nphi],
    [0, nphi, -1],
    [0, -nphi, -1],
    [nphi, 1, 0],
    [-nphi, 1, 0],
    [-nphi, -1, 0],
    [nphi, -1, 0]
    ];

    const faces = [
    [0, 1, 8],
    [0, 11, 1],
    [2, 0, 3],
    [2, 3, 5],
    [4, 5, 9],
    [4, 10, 5],
    [6, 1, 7],
    [6, 7, 4],
    [8, 9, 3],
    [8, 6, 9],
    [10, 7, 11],
    [10, 11, 2],
    [0, 2, 11],
    [0, 8, 3],
    [1, 11, 7],
    [1, 6, 8],
    [3, 9, 5],
    [2, 5, 10],
    [4, 9, 6],
    [4, 7, 10]
    ];

    Solid.call(this, vertices, faces);
}
Icosahedron.prototype = new Solid();
Icosahedron.constructor = Icosahedron;

export default Icosahedron;