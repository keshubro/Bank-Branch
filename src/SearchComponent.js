import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import {  Required, Pattern } from '@lion/form-core';
import { localize,LocalizeMixin } from '@lion/localize';

export class SearchComponent extends LocalizeMixin(LitElement){

    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
    }

    static get styles() {
        return css`
            .search-component{
                background-color: white;
            }

            .container{
                width: 500px;
                background-color: lightblue;
            }
            
            lion-input{
                padding: 15px;
            }

            input{
                border-radius: 5px;
            }

            button{
                margin: 0px;
                font-size: 14px;
                height:30px;
                border: 1px solid #fff; 
                background-color: transparent;
            }

          
            .search{
                
                text-align: right;
                padding: 15px;
                text-transform: uppercase;
                font-size: 16px;
                font-weight: bold;
                outline: none; 
                
            }
            

            button:hover,
            button:active,
            button:focus 
            {
                background-color: white;
                color: steelblue;
                border: 1px solid steelblue;
                outline: none;
                cursor: pointer;
                
            }    

            h2{
                text-align: center;
                
            }

        `

    }

    
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
                    <div class="container">
                        <div class="search-customer">
                            <h2>Search Customer</h2>
                        </div>
                        <div class="account-number">
                            <lion-input name= "account number" label="${localize.msg('lit-html-example:accountnumber')}" .validators="${[new Pattern(/^[a-zA-Z\s]*$/), new Required()]}">Account Number</lion-input>
                        </div>
                        <div class="search">    
                            <lion-button type="submit" ><a href="/search">${localize.msg('lit-html-example:search')}</a></lion-button>
                        </div>
                    </div>
                </form>
            </lion-form>
        `;
    }

}

window.customElements.define('search-component', SearchComponent);






