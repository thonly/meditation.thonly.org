const template = document.createElement("template");

template.innerHTML = `
    <link rel="stylesheet" href="components/tl-market/shadow.css">
    <header>
        <h4>Market: <span id="market"></span></h4>
        <h4><span id="open">6:30 AM</span> to <span id="close">1:00 PM</span></h4>
    </header>
    <main>
        <fieldset>
            <legend>USD Government</legend>
            <article>
                <h2>BTC: <span id="BTC-24HR"></span> | <span id="BTC-HL"></span></h2>
                <h2>ETH: <span id="ETH-24HR"></span> | <span id="ETH-HL"></span></h2>
                <h2>DOGE: <span id="DOGE-24HR"></span> | <span id="DOGE-HL"></span></h2>
                <h2>MANA: <span id="MANA-24HR"></span> | <span id="MANA-HL"></span></h2>
                <!--<h2>SFM: <span id="SFM-dollar"></span> | <span id="SFM-percent"></span></h2>-->
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
            <legend>ABNB Int'l Travel</legend>
            <article class="price">
                <h3 style="display:none">Current Price: <span id="price"></span></h3>  
                <h2>$ Price Change: <span id="dollar-price-change"></span></h2>
                <h2>% Price Change: <span id="percent-price-change"></span></h2>
                <h3 style="display:none">Open Price: <span id="open-price"></span></h3>
                <h3 style="display:none">Close Price: <span id="close-price"></span></h3>
                <!--<h3>Net Change: <span id="net-change"></span></h3>-->
                <h3 style="display:none">Total Volume: <span id="total-volume"></span></h3>
            </article>
            <article class="bid" style="display:none">
                <h3>Bid Price: <span id="bid-price"></span></h3>
                <h3>Bid Size: <span id="bid-size"></span></h3>
                <h3>Ask Price: <span id="ask-price"></span></h3>
                <h3>Ask Size: <span id="ask-size"></span></h3>
                <h3>High Price: <span id="high-price"></span></h3>
                <h3>Low Price: <span id="low-price"></span></h3>
            </article>
            <article class="stats" style="display:none">
                <h3>P/E Ratio: <span id="pe-ratio"></span></h3>
                <h3>Volatility: <span id="volatility"></span></h3>
                <h3>52-Week High: <span id="52wk-high"></span></h3>
                <h3>52-Week Low: <span id="52wk-low"></span></h3>
            </article>
        </fieldset>
    </main>
    <footer>
        <button id="connect" onclick="this.getRootNode().host.connect(this)">Get Market Data</button>
    </footer>
`;

export default template;