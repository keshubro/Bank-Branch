import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import {  Required, Pattern } from '@lion/form-core';

export class SearchComponent extends LitElement{

    constructor(){
        super();
    }

    static get properties() {
        return{
            'type' : 'string'
        }
    }

    render() {
        loadDefaultFeedbackMessages();
        return html`
            <lion-form >
                <form class="search-component" @submit=${ev => ev.preventDefault()}>
                    <div>
                        <h2>Search Customer</h2>
                        <lion-input name= "account number" label="Account Number" .validators="${[new Pattern(/^[a-zA-Z\s]*$/), new Required()]}">Account Number</lion-input>
                        <lion-button type="submit" ><a href="/search">Search</a></lion-button>

                    </div>
                </form>
            </lion-form>
        `;
    }

}

window.customElements.define('search-component', SearchComponent);






