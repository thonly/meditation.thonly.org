const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/tl-horoscope/shadow.css">
    <section>
        <slot></slot>
        <p>Sun: <span id="sun-sign"></span></p>
        <p>Moon: <span id="moon-sign"></span></p>
        <p>Earth: <span id="earth-as"></span></p>
        <p style="display:none">Earth: <span id="earth-mc"></span></p>
    </section>
`;

export default template;