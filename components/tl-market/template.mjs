const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/tl-market/shadow.css">
    <header>
        <br>
    </header>
    <main>
        <fieldset>
            <legend>Int'l Travel</legend>
            <article>
                <h2>ABNB: <span id="dollar-price-change"></span> | <span id="percent-price-change"></span></h2>
            </article>
        </fieldset>
        <br>
        <fieldset>
            <legend>USA Corporations</legend>
            <article>
                <h2>NASDAQ: <span id="$COMPX" style="display:none"></span> <span id="$COMPX-dollar"></span> | <span id="$COMPX-percent"></span></h2>
                <h2>S&P 500: <span id="$SPX.X" style="display:none"></span> <span id="$SPX.X-dollar"></span> | <span id="$SPX.X-percent"></span></h2>
                <h2>DJIA: <span id="$DJI" style="display:none"></span> <span id="$DJI-dollar"></span> | <span id="$DJI-percent"></span></h2>
            </article>
        </fieldset>
        <br>
        <fieldset>
            <legend>USD Governments</legend>
            <article>
                <h2>BTC: <span id="BTC-24HR"></span> | <span id="BTC-HL"></span></h2>
                <h2>ETH: <span id="ETH-24HR"></span> | <span id="ETH-HL"></span></h2>
                <h2>DOGE: <span id="DOGE-24HR"></span> | <span id="DOGE-HL"></span></h2>
                <h2>MANA: <span id="MANA-24HR"></span> | <span id="MANA-HL"></span></h2>
                <!--<h2>SFM: <span id="SFM-dollar"></span> | <span id="SFM-percent"></span></h2>-->
            </article>
        </fieldset>
        <br>
        <button onclick="this.getRootNode().host.refresh(this)">Refresh</button>
    </main>
    <footer>
        <button id="connect" onclick="this.getRootNode().host.connect(this)">Get Market Data</button>
    </footer>
`;

export default template;