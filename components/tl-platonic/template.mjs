const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/tl-platonic/shadow.css">
    <!--<iframe src="components/tl-platonic/iframe/index.html" fetchpriority="high" loading="eager"></iframe>-->
    <h2 id="element"></h2>
    <section>
        <figure id="Tetrahedron"></figure>
        <figure id="Icosahedron"></figure>
        <figure id="Cube"></figure>
        <figure id="Octahedron"></figure>
    </section>
    <p id="solid"></p>
`;

export default template;