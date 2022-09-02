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

const Ar3 = {
    normalize: function (ar3) {
    const lng = mhypot(...ar3); // hope this is != 0
    return [ar3[0] / lng, ar3[1] / lng, ar3[2] / lng];
    },
    dotProduct: function (ar3a, ar3b) {
    return ar3a[0] * ar3b[0] + ar3a[1] * ar3b[1] + ar3a[2] * ar3b[2];
    },
    lerp: function (ar3a, ar3b, alpha) {
    const umalpha = 1 - alpha;
    return [
        ar3a[0] * umalpha + ar3b[0] * alpha,
        ar3a[1] * umalpha + ar3b[1] * alpha,
        ar3a[2] * umalpha + ar3b[2] * alpha
    ];
    }
}; //
//------------------------------------------------------------------------
function Solid(vertices, faces) {
    /* takes a list a vertices and of faces
vertices are given as array of three coordinates of points on a (0,0,0)
centered sphere. This constructor will normalize the radius of this sphere to 1
faces are given as arrays of 3 or more points, all oriented turning clockwise
(as seen from the sphere center)
*/
    if (vertices == undefined) return this;
    this.vertices = vertices.map((point) => Ar3.normalize(point));
    this.faces = faces;
    this.calcFaceNormals();
    // prepare arrays with elements for all division levels
    this.verticesD = [this.vertices];
    this.facesD = [this.faces];
    this.faceCentersD = [this.faceCenters];
    this.faceNormalsD = [this.faceNormals];
    for (let k = 1; k <= 4; ++k) {
    this.divide();
    this.verticesD.push(this.vertices);
    this.facesD.push(this.faces);
    this.faceCentersD.push(this.faceCenters);
    this.faceNormalsD.push(this.faceNormals);
    }
} // Solid

//------------------------------------------------------------------------
Solid.prototype.calcFaceNormals = function () {
    // center of faces
    // used (after normalization) as normals to faces

    this.faceCenters = [];
    this.faces.forEach((face) => {
    this.faceCenters.push([
        face.reduce((sum, kvert) => sum + this.vertices[kvert][0], 0) /
        face.length,
        face.reduce((sum, kvert) => sum + this.vertices[kvert][1], 0) /
        face.length,
        face.reduce((sum, kvert) => sum + this.vertices[kvert][2], 0) /
        face.length
    ]);
    });
    // normalize vectors
    this.faceNormals = this.faceCenters.map((vec) => Ar3.normalize(vec));
}; //

//------------------------------------------------------------------------

Solid.prototype.divide = function () {
    /* creates new vertices and faces arrays, by dividing existing faces into
smaller faces and projecting corresponding vertices on the sphere.
The resulting faces are no longer equilateral, but this gives nice results */

    const nvertices = this.vertices.slice();
    const nfaces = [];
    let s0, s1, s2, s3, s4, s5;
    this.faces.forEach((face, k) => {
    if (this.faces[0].length == 3) {
        this.divideTriangle(face, nvertices, nfaces); // if triangle
    } else if (this.faces[0].length == 4) {
        this.divideQuadrilateral(face, nvertices, nfaces, this.faceNormals[k]);
    } else {
        this.dividePentagon(face, nvertices, nfaces, this.faceNormals[k]);
    }
    });

    this.vertices = nvertices;
    this.faces = nfaces;
    this.calcFaceNormals();
}; // divide

//------------------------------------------------------------------------

Solid.prototype.divideTriangle = function (face, nvertices, nfaces) {
    /* creates new vertices and faces arrays, by dividing existing faces into
4 smaller faces and projecting them on the sphere.
The resulting faces are no longer equilateral, but this gives nice results
not optimal : vertices at the center of edges are duplicated!
Benchmarking shows this does not really matter, all the time is taken by graphic functions
*/

    const s0 = this.vertices[face[0]];
    const s1 = this.vertices[face[1]];
    const s2 = this.vertices[face[2]];
    const s3 = Ar3.normalize(Ar3.lerp(s0, s1, 0.5));
    const s4 = Ar3.normalize(Ar3.lerp(s1, s2, 0.5));
    const s5 = Ar3.normalize(Ar3.lerp(s2, s0, 0.5));
    const norgv = nvertices.length;
    nvertices.push(s3, s4, s5);
    nfaces.push(
    [face[0], norgv, norgv + 2], // 0 3 5
    [norgv, face[1], norgv + 1], // 3 1 4
    [norgv + 2, norgv + 1, face[2]], // 5 4 2
    [norgv + 1, norgv + 2, norgv]
    ); // 4 5 3
}; // divide
//------------------------------------------------------------------------

Solid.prototype.divideQuadrilateral = function (
    face,
    nvertices,
    nfaces,
    center
) {
    /* creates new vertices and faces arrays, by dividing existing faces into
4 smaller faces and projecting them on the sphere.
Uses the faceNormal vector, pointing to the center of the polygon, and already normalized
The resulting faces are triangles */

    const s0 = this.vertices[face[0]];
    const s1 = this.vertices[face[1]];
    const s2 = this.vertices[face[2]];
    const s3 = this.vertices[face[3]];

    const norgv = nvertices.length;
    nvertices.push(center);
    nfaces.push(
    [norgv, face[0], face[1]],
    [norgv, face[1], face[2]],
    [norgv, face[2], face[3]],
    [norgv, face[3], face[0]]
    );
}; // divide
//------------------------------------------------------------------------

Solid.prototype.dividePentagon = function (face, nvertices, nfaces, center) {
    /* creates new vertices and faces arrays, by dividing existing faces into
5 smaller faces 
Uses the faceNormal vector, pointing to the center of the polygon, and already normalized
The resulting faces are triangles */

    const s0 = this.vertices[face[0]];
    const s1 = this.vertices[face[1]];
    const s2 = this.vertices[face[2]];
    const s3 = this.vertices[face[3]];
    const s4 = this.vertices[face[4]];

    const norgv = nvertices.length;
    nvertices.push(center);
    nfaces.push(
    [norgv, face[0], face[1]],
    [norgv, face[1], face[2]],
    [norgv, face[2], face[3]],
    [norgv, face[3], face[4]],
    [norgv, face[4], face[0]]
    );
}; // divide
//------------------------------------------------------------------------

Solid.prototype.drawIt = function (dang1, dang2) {
    let pface, alpha, hue;

    // work with current division level

    const vertices = this.verticesD[uiv.division];
    const faces = this.facesD[uiv.division];
    const faceNormals = this.faceNormalsD[uiv.division];
    const faceCenters = this.faceCentersD[uiv.division];
    const colors = this.colorsD[uiv.division];

    // rotation matrix coefficients
    let s1 = msin(dang1);
    let c1 = mcos(dang1);
    let s2 = msin(dang2);
    let c2 = mcos(dang2);

    let m00 = c2;
    let m01 = s2 * s1;
    let m02 = s2 * c1;
    let m11 = c1;
    let m12 = -s1;

    let m20 = -s2;
    let m21 = s1 * c2;
    let m22 = c1 * c2;

    // 3D rotation of solid
    globRot = mat33Prod([m00, m01, m02, 0, m11, m12, m20, m21, m22], globRot);
    let projPoints = vertices.map(globRotate);
    let rotNormals = faceNormals.map(globRotate);

    // perspective
    projPoints = perspective.projection(projPoints);

    let projCenters;
    if (uiv.hole) {
    let rotCenters = faceCenters.map(globRotate);
    projCenters = perspective.projection(rotCenters);
    }

    // drawing
    ctx.clearRect(0, 0, maxx, maxy);

    // sort visible / hidden faces
    let visible = [],
    hidden = [];

    faces.forEach((face, k) => {
    pface = [projPoints[face[0]], projPoints[face[1]], projPoints[face[2]]];
    if (isDirect2(pface[0], pface[1], pface[2])) {
        hidden.push(k);
    } else {
        visible.push(k);
    }
    });

    if (uiv.hole) {
    // display hidden faces first
    alpha = uiv.hole;
    hidden.forEach((khidden) => {
        const face = faces[khidden];
        ctx.beginPath();
        let p = projPoints[face[0]];
        ctx.moveTo(p[0], p[1]);
        for (let k = 1; k < face.length; ++k) {
        p = projPoints[face[k]];
        ctx.lineTo(p[0], p[1]);
        }
        ctx.closePath();
        let cent = projCenters[khidden];

        p = lerp2(cent, projPoints[face[0]], alpha);
        ctx.moveTo(p[0], p[1]);
        for (let k = 1; k < face.length; ++k) {
        p = lerp2(cent, projPoints[face[k]], alpha);
        ctx.lineTo(p[0], p[1]);
        }

        ctx.closePath();

        let alphaLum = mmax(
        0,
        (1 + Ar3.dotProduct(rotNormals[khidden], lightDir)) / 2
        );
        alphaLum = 1 - alphaLum; // inverted for inside side
        alphaLum *= alphaLum; // accentuate diff light / dark
        hue = uiv.color < 1 ? 360 * uiv.color : colors[khidden];
        ctx.fillStyle = `hsl(${hue},100%, ${10 + 25 * alphaLum}%)`;
        ctx.fill("evenodd");
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 0.1;
        ctx.stroke();
    });
    }
    // allways draw visible
    alpha = uiv.hole;
    visible.forEach((kvisible) => {
    const face = faces[kvisible];
    ctx.beginPath();
    let p = projPoints[face[0]];
    ctx.moveTo(p[0], p[1]);
    for (let k = 1; k < face.length; ++k) {
        p = projPoints[face[k]];
        ctx.lineTo(p[0], p[1]);
    }
    ctx.closePath();
    if (uiv.hole) {
        // draw hole if any
        let cent = projCenters[kvisible];

        p = lerp2(cent, projPoints[face[0]], alpha);
        ctx.moveTo(p[0], p[1]);
        for (let k = 1; k < face.length; ++k) {
        p = lerp2(cent, projPoints[face[k]], alpha);
        ctx.lineTo(p[0], p[1]);
        }

        ctx.closePath();
    }
    let alphaLum = mmax(
        0,
        (1 + Ar3.dotProduct(rotNormals[kvisible], lightDir)) / 2
    );
    alphaLum *= alphaLum; // accentuate diff light / dark
    hue = uiv.color < 1 ? 360 * uiv.color : colors[kvisible];
    ctx.strokeStyle = ctx.fillStyle = `hsl(${hue},100%, ${
        20 + 50 * alphaLum
    }%)`;
    ctx.fill("evenodd");
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 0.25;
    ctx.stroke();
    });

    function globRotate(p) {
    return [
        globRot[0] * p[0] + globRot[1] * p[1] + globRot[2] * p[2],
        globRot[3] * p[0] + globRot[4] * p[1] + globRot[5] * p[2],
        globRot[6] * p[0] + globRot[7] * p[1] + globRot[8] * p[2]
    ];
    }
}; // drawIt

export default Solid;