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
        function Cube() {
            const vertices = [
            [1, 1, 1],
            [1, -1, 1],
            [1, -1, -1],
            [1, 1, -1],
            [-1, 1, 1],
            [-1, -1, 1],
            [-1, -1, -1],
            [-1, 1, -1]
            ];

            /* order of vertices matter !
            */
            const faces = [
            [0, 1, 2, 3],
            [0, 3, 7, 4],
            [6, 5, 4, 7],
            [6, 2, 1, 5],
            [0, 4, 5, 1],
            [6, 7, 3, 2]
            ];

            Solid.call(this, vertices, faces);
        }

        Cube.prototype = new Solid();
        Cube.constructor = Cube;
        export default Cube;