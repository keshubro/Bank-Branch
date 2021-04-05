import { LitElement, html, css } from "@lion/core/node_modules/lit-element";
import search from "./images/search-solid.js";
import query from "./images/query-icon.js";

export class LandingComponent extends LitElement {
    
    constructor() {
        super();

    }

    static get styles() {
        return css`
            .wrapper {
                display: flex;
                height: 93.9vh;
                align-items: center;
            }

            #icon {
                height: 200px;
                width: 200px;
                margin-top: 10px;
            }

            .icon-div {
                text-align: center;
            }

            .card:hover{
                background-color: #dee2e6;
                cursor:pointer;
            }

            .card-body {
                background-color: rgb(255, 98, 0, 0.6);
            }

            .card-title {
                text-align: center;
                
            }

            p {
                font-size: 13px;
                text-align: center;
            }
        `;
    }

    goToCustomerSearch() {
        console.log('card clik');

        this.dispatchEvent(new CustomEvent('change-route',{bubbles: true, composed: true, detail: {
            route: '/search',
        }}));
    }

    goToCustomerQueries() {
        // TODO - Create the queries page
        this.dispatchEvent(new CustomEvent('change-route',{bubbles: true, composed: true, detail: {
            route: '/queries',
        }}));

    }

    render() {
        return html`
        <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">

        <div class="wrapper">
            <div class="container">
                <div class="row d-flex justify-content-center align-items-center">
                    <div class="col-md-6 col-12 d-flex justify-content-center mt-2">
                        <div class="card" @click=${this.goToCustomerSearch} style="width: 18rem;">
                            <div class="icon-div">
                                <lion-icon aria-label="Pointing left" .svg="${query}" id="icon"></lion-icon>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"><b>Customer Search</b></h5>
                                <p class="card-text">Click here to update the customer details</p>
                                
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 col-12 d-flex justify-content-center mt-2">
                        <div class="card" @click=${this.goToCustomerQueries} style="width: 18rem;">
                            <div class="icon-div">
                                <lion-icon aria-label="Pointing left" .svg="${search}" id="icon"></lion-icon>
                            </div>
                            <div class="card-body">
                                <h5 class="card-title"><b>Customer Queries</b></h5>
                                <p class="card-text">Click here to answer the customer queries</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

customElements.define('landing-component', LandingComponent);