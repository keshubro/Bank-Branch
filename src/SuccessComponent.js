import { LitElement, html, css } from "lit-element";

export class SuccessComponent extends LitElement {
    static get styles() {
        return css`
            lion-button {
                background-color: green;
                color: white;
                border-radius: 5px;
            }

            lion-button:hover {
                background-color: #057305c2;
                cursor: pointer;
            }

            .home {
                text-align: right;
            }
        `;
    }

    goHome() {
        window.location.href = "/search";
    }

    constructor() {
        super();
    }

    render() {
        return html`
            <h3>Customer Details are Updated Successfully</h3>
            <div class="home">
                <lion-button @click=${this.goHome}>Home</lion-button>
            </div>
        `;
    }
}

window.customElements.define("success-component", SuccessComponent);
