const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/tl-birth/shadow.css">
    <section>
        <input id="birth-date" type="datetime-local" placeholder="Date and Time" />
        <br />
        <input id="birth-place" type="search" placeholder="City, Country" />
        <button id="birth-button">Set Birth</button>
    </section>
`;

export default template;