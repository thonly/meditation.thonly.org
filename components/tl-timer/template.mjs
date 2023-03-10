const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/tl-timer/shadow.css">
    <h1 id="timer"></h1>
    <slot></slot>
    <section>
        <button onclick="this.getRootNode().host.start(this, 0)">Infinity</button>
        <button id="pause" onclick="this.getRootNode().host.pause(this)" disabled>Pause</button>
        <button id="stop" onclick="this.getRootNode().host.stop(this)" disabled>Stop</button>
        <br />
        <button onclick="this.getRootNode().host.start(this, 15)">15 Minutes</button>
        <button onclick="this.getRootNode().host.start(this, 30)">30 Minutes</button>
        <button onclick="this.getRootNode().host.start(this, 40)">40 Minutes</button>
        <br />
        <button onclick="this.getRootNode().host.start(this, 60)">1 Hour</button>
        <button onclick="this.getRootNode().host.start(this, 60*2)">2 Hours</button>
        <button onclick="this.getRootNode().host.start(this, 60*3)">3 Hours</button>
    </section>
    <p><a href="https://player.thonly.org" target="_blank">Music Player</a></p>
`;

export default template;