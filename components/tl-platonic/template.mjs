const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/tl-platonic/shadow.css">
    <figure id="solid"></figure>
    <div id ="menu">
        <p id="controls">close controls</p>
        <div id="showhide">
            <hr>
            <p><input type="range" min=0 max=4  step=1 value=3 id="solid"> solid</p>
            <p><input type="range" min=0 max=4 step=1 value=0 id="division"> face division</p>
            <p><input type="range" min=0 max=0.9 step="any" value=0.8 id="hole"> hole</p>
            <p><input type="range" min=0 max=1.2 step="any" value=0.5 id="color"> color</p>
            <p><input type="range" min=0 max=4 step="any" value=1 id="speed"> speed</p>
            <p>FPS : <span id="fps"></span></p>
        </div>
    </div>
`;

export default template;