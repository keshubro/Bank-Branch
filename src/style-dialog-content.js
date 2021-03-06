import { LitElement, html, css } from "lit-element";
import "@lion/button/lion-button.js";

export class StyleDialogContent extends LitElement {
    static get styles() {
        return css`
            h3 {
                padding: 25px 25px 10px 25px;
            }
            p {
                padding-left: 25px;
            }
            .dailog-container {
                width: 30vw;
                background-color: #f7f3f2;
                border-radius: 4px;
                color: black;
                border: 2px solid white;
            }

            lion-button {
                margin: 5px;
                color: white;
                padding: 5px 20px;
                border-radius: 5px;
                cursor: pointer;
                background-color: #5ea15ec2;
            }

            .button-container {
                text-align: right;
                padding: 25px;
            }
            #x-btn {
                background-color: #f7f3f2;
                color: black;
                float: right;
                margin: 5px;
                font-size: 20px;
            }
            lion-button:hover {
                background-color: #1e881ec2;
                cursor: pointer;
            }
            @media only screen and (max-width: 576px) {
                .dailog-container {
                    width: 70vw;
                }
            }
        `;
    }

    constructor() {
        super();
    }

    updated() {
        this.shadowRoot
            .getElementById("x-btn")
            .addEventListener("click", () => {
                //console.log("x btn clicked");
                this.dispatchEvent(
                    new CustomEvent("close-overlay", { bubbles: true })
                );
            });

        this.shadowRoot
            .getElementById("proceed-btn")
            .addEventListener("click", () => {
                //console.log("Proceed btn clicked");
                debugger
                this.dispatchEvent(new CustomEvent("summary-page"));
            });

        this.shadowRoot
            .getElementById("cancel-btn")
            .addEventListener("click", () => {
                // console.log("close btn clicked");
                this.dispatchEvent(
                    new CustomEvent("close-overlay", { bubbles: true })
                );
            });
    }

    render() {
        return html`
            <div class="dailog-container">
                <lion-button id="x-btn">x</lion-button>
                <h3>Are you sure!!</h3>
                <p><b>Do you want to proceed?</b></p>
                <div class="button-container">
                    <lion-button id="proceed-btn">Proceed</lion-button>
                    <lion-button id="cancel-btn">Cancel</lion-button>
                </div>
            </div>
        `;
    }
}

customElements.define("styled-dialog-content", StyleDialogContent);
