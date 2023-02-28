import TDA from "https://stocks.thonly.org/library/TDA.mjs";
import { INDEXES } from "https://stocks.thonly.org/library/stocks.mjs";
import { formatToDollar, formatToPercent, formatToDollars } from "https://stocks.thonly.org/library/utils.mjs";
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
        this.#renderMarket(data.stocks);
        this.#renderStock(data.stocks.ABNB);

        this.shadowRoot.querySelector('main').style.display = 'block';
        this.shadowRoot.querySelector('footer').style.display = 'none';
    }

    #renderCrypto(cryptos) {
        for (let crypto in cryptos) {
            formatToDollar(this.shadowRoot.getElementById(`${crypto}-24HR`), parseFloat(cryptos[crypto].last) - parseFloat(cryptos[crypto].open));
            formatToDollar(this.shadowRoot.getElementById(`${crypto}-HL`), parseFloat(cryptos[crypto].high) - parseFloat(cryptos[crypto].low));
        }
    }

    #renderMarket(stocks) {
        INDEXES.forEach(index => {
            if (stocks[index]) {
                this.shadowRoot.getElementById(index).textContent = formatToDollars(stocks[index].lastPrice);
                formatToDollar(this.shadowRoot.getElementById(index + '-dollar'), stocks[index].netChange);
                formatToPercent(this.shadowRoot.getElementById(index + '-percent'), stocks[index].netPercentChangeInDouble);
            }
        });
    }

    #renderStock(stock) {
        formatToDollar(this.shadowRoot.getElementById('dollar-price-change'), stock.mark - stock.closePrice);
        formatToPercent(this.shadowRoot.getElementById('percent-price-change'), stock.mark / stock.closePrice * 100 - 100);
    }
}

customElements.define("tl-market", TlMarket);