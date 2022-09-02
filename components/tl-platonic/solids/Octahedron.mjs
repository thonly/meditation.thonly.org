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
        //------------------------------------------------------------------------
        function Octahedron() {
            const vertices = [
            [1, 0, 0],
            [-1, 0, 0],
            [0, 1, 0],
            [0, -1, 0],
            [0, 0, 1],
            [0, 0, -1]
            ];

            /* order of vertices matter !
            */
            const faces = [
            [4, 0, 2],
            [1, 4, 2],
            [5, 1, 2],
            [0, 5, 2],
            [0, 4, 3],
            [4, 1, 3],
            [1, 5, 3],
            [5, 0, 3]
            ];

            Solid.call(this, vertices, faces);
        }

        Octahedron.prototype = new Solid();
        Octahedron.constructor = Octahedron;
        export default Octahedron;