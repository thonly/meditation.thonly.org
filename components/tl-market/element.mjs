import TDA from "https://stocks.thonly.org/library/TDA.mjs";
import { INDEXES } from "https://stocks.thonly.org/library/stocks.mjs";
import { formatToDollar, formatToPercent, formatToDollars, formatToQuantity } from "https://stocks.thonly.org/library/utils.mjs";
import template from './template.mjs';

class TlMarket extends HTMLElement {
    #origin = "https://stocks.thonly.org/";

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        if (localStorage.getItem('credentials')) {
            this.#render();
        } else {
            this.shadowRoot.querySelector('footer').style.display = 'block';
        }
    }

    async connect(button=null) {
        let pin;
        if (button) {
            button.disabled = true;
            pin = window.prompt("Please enter your PIN:");
        } else {
            button = this.shadowRoot.getElementById('connect');
            button.disabled = true;
            pin = window.prompt("Incorrect PIN. Please try again:");
        }
        if (pin) await this.#getCredentials(pin)
        else button.disabled = false;
    }

    async #getCredentials(pin) {
        const response = await fetch(this.#origin, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ pin })
        });

        const credentials = await response.json();
        if (credentials.personal) {
            localStorage.setItem('credentials', JSON.stringify(credentials));
            await this.#render();
        } else await this.connect();
    }

    async #render() {
        const tda = new TDA();
        const data = await tda.getAccount("corporate");
        this.#renderCrypto(await (await fetch(this.#origin + "coinbase")).json());
        this.#renderMarket(data.market, data.stocks);
        this.#renderStock(data.stocks.ABNB);

        //this.shadowRoot.querySelector('header').style.display = 'block';
        this.shadowRoot.querySelector('main').style.display = 'block';
        this.shadowRoot.querySelector('footer').style.display = 'none';
    }

    #renderCrypto(cryptos) {
        for (let crypto in cryptos) {
            formatToDollar(this.shadowRoot.getElementById(`${crypto}-24HR`), parseFloat(cryptos[crypto].last) - parseFloat(cryptos[crypto].open));
            formatToDollar(this.shadowRoot.getElementById(`${crypto}-HL`), parseFloat(cryptos[crypto].high) - parseFloat(cryptos[crypto].low));
        }
    }

    #renderMarket(market, stocks) {
        const condition = this.shadowRoot.getElementById('market');
        const open = this.shadowRoot.getElementById('open');
        const close = this.shadowRoot.getElementById('close');
        if (market.isMarketOpen) {
            condition.textContent = 'Open';
            open.textContent = new Date(market.equity.EQ.sessionHours.regularMarket[0].start).toLocaleTimeString();
            close.textContent = new Date(market.equity.EQ.sessionHours.regularMarket[0].end).toLocaleTimeString();
            condition.style.color = 'green';
            open.style.color = 'green';
            close.style.color = 'green';
        } else {
            condition.textContent = 'Close';
            condition.style.color = 'red';
            open.style.color = 'grey';
            close.style.color = 'grey';
        }

        INDEXES.forEach(index => {
            if (stocks[index]) {
                this.shadowRoot.getElementById(index).textContent = formatToDollars(stocks[index].lastPrice);
                formatToDollar(this.shadowRoot.getElementById(index + '-dollar'), stocks[index].netChange);
                formatToPercent(this.shadowRoot.getElementById(index + '-percent'), stocks[index].netPercentChangeInDouble);
            }
        });
    }

    #renderStock(stock) {
        this.shadowRoot.getElementById('bid-price').textContent = formatToDollars(stock.bidPrice);
        this.shadowRoot.getElementById('bid-size').textContent = formatToQuantity(stock.bidSize);
        this.shadowRoot.getElementById('ask-price').textContent = formatToDollars(stock.askPrice);
        this.shadowRoot.getElementById('ask-size').textContent = formatToQuantity(stock.askSize);
        this.shadowRoot.getElementById('high-price').textContent = formatToDollars(stock.highPrice);
        this.shadowRoot.getElementById('low-price').textContent = formatToDollars(stock.lowPrice);

        this.shadowRoot.getElementById('price').textContent = formatToDollars(stock.mark);
        //this.shadowRoot.getElementById('dollar-price-change').textContent = formatToDollars(stock.markChangeInDouble);
        //this.shadowRoot.getElementById('percent-price-change').textContent = formatToPercents(stock.markPercentChangeInDouble);
        formatToDollar(this.shadowRoot.getElementById('dollar-price-change'), stock.mark - stock.closePrice);
        formatToPercent(this.shadowRoot.getElementById('percent-price-change'), stock.mark / stock.closePrice * 100 - 100);
        this.shadowRoot.getElementById('open-price').textContent = formatToDollars(stock.openPrice);
        this.shadowRoot.getElementById('close-price').textContent = formatToDollars(stock.closePrice);
        //this.shadowRoot.getElementById('net-change').textContent = formatToDollars(stock.netChange);
        this.shadowRoot.getElementById('total-volume').textContent = formatToQuantity(stock.totalVolume);

        this.shadowRoot.getElementById('pe-ratio').textContent = stock.peRatio;
        this.shadowRoot.getElementById('volatility').textContent = stock.volatility;
        this.shadowRoot.getElementById('52wk-high').textContent = formatToDollars(stock['52WkHigh']);
        this.shadowRoot.getElementById('52wk-low').textContent = formatToDollars(stock['52WkLow']);
    }
}

customElements.define("tl-market", TlMarket);