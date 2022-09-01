const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/tl-music/shadow.css">
    <select id="music">
        <option value="silence">Silence</option>
        <option value="alarm">Alarm</option>
        <optgroup label="Chakras">
            <option value="uniaural">Uniaural</option>
            <option value="binaural" selected>Binaural</option>
        </optgroup>
        <optgroup label="Brahmin">
            <option value="kiitos">Kiitos</option>
            <option value="thonly">THonly</option>
        </optgroup>
    </select>
`;

export default template;