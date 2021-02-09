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

            .oneitem:hover{
                background-color: #555;
                margin: 0;
                padding: 0;
            }
            
            .search-component{
                background-color: white;
            }

            .container{
                width: 500px;
                background-color: lightblue;
                box-shadow: 5px 10px 18px #888888;
                border-radius: 5px;
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
        this.search = '';
        this.matchList = '';
    }

    static get properties() {
        return{
            'type' : 'string'
        }
    }

    updated()
    {
        super.updated();
        // debugger;
        this.search = this.shadowRoot.getElementById('search');
        this.matchList = this.shadowRoot.getElementById('match-list');

        console.log(this.search);
        console.log(this.matchList);

        this.search.addEventListener('input', () => this.searchStates(this.search.value));
        this.matchList.addEventListener('click', this.yoyo.bind(this));
    }

    yoyo(e)
    {
        // debugger;
        this.search.value = e.target.parentElement.querySelector('input').value;
        this.matchList.innerHTML = '';
        console.log(this.search);
    }

    async searchStates(searchText)
    {
        // debugger;
        if(searchText.length < 3)
            return false;

        const res = await fetch('http://localhost:3000/customers');
        const customers = await res.json();
        
        //Get matches to current text input
        let matches = customers.filter(customer => {
            const regex = new RegExp(`^${searchText}`, 'gi');   // 'gi' makes it case insensitive
            return customer.accountno.match(regex);
        });

        if(searchText.length === 0)
        {
            // If nothing is there in the input field
            matches = [];
            this.matchList.innerHTML = '';
        }

        this.outputHtml(matches);
    }

    outputHtml(matches)
    {
        if(matches.length > 0)
        {
            const html = matches.map(match => `
                <div class="oneitem">
                    <h4>${match.accountno}</h4>
                    <input type='hidden' value="${match.accountno}" class="item-input">
                </div>
            `)
            .join('');

            this.matchList.innerHTML = html;
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
                            <lion-input name= "account number" id="search" label="${localize.msg('lit-html-example:accountnumber')}" .validators="${[new Pattern(/^[a-zA-Z\s]*$/), new Required()]}">Account Number</lion-input>
                            <div id="match-list"></div>
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






