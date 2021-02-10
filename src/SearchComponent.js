import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import { ajax } from '@lion/ajax';
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
                cursor: pointer;
            }

            #match-list{
                background-color: white;
            }

            .oneitem > p{
                padding: 5px;
                margin: 0;
                border-bottom: 1px solid;
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
                padding: 0px;
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

            #nomatch{
                display: none;
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
        // The user should only be able to enter a number
        this.shadowRoot.getElementById('search').addEventListener('input', function(){
            if(isNaN(this.value))
            {
                this.value = this.value.substr(0, this.value.length - 1);
            }
        });

        this.search = this.shadowRoot.getElementById('search');
        this.matchList = this.shadowRoot.getElementById('match-list');

        console.log(this.search);
        console.log(this.matchList);

        this.search.addEventListener('input', () => this.searchStates(this.search.value));
        this.matchList.addEventListener('click', this.itemClicked.bind(this));
    }

    itemClicked(e)
    {
        // debugger;
        this.search.value = e.target.parentElement.querySelector('input').value;
        this.matchList.innerHTML = '';
        console.log(this.search);
    }

    async searchStates(searchText)
    {
        // debugger;
        

        // const res = await fetch('http://localhost:3000/customers');
        // const customers = await res.json();

        let customers;

        await ajax
        .get('http://localhost:3000/customers')
        .then(response => {
            console.log(response.data);
            customers = response.data;
        })
        
        //Get matches to current text input
        let matches = customers.filter(customer => {
            const regex = new RegExp(`^${searchText}`, 'gi');   // 'gi' makes it case insensitive
            return customer.accountno.match(regex);
        });

        
        if(searchText.length < 3)
        {
            // If nothing is there in the input field
            matches = [];
            this.matchList.innerHTML = '';
            this.shadowRoot.getElementById('nomatch').style.display = 'none';
        }

        // If the value entered does not match any accountno in the database
        if(searchText.length >=3)
        {
            // debugger;
            console.log(this.shadowRoot.getElementById('nomatch'));
            if(matches.length == 0)
            {
                this.shadowRoot.getElementById('nomatch').style.display = 'block';
                this.shadowRoot.getElementById('nomatch').innerHTML = `<p style="color:red">No match found !</p>`;
            }
            else
            {
                this.shadowRoot.getElementById('nomatch').style.display = 'none';
            }
            
        }

        this.outputHtml(matches);
    }

    outputHtml(matches)
    {
        if(matches.length > 0)
        {
            const html = matches.map(match => `
                <div class="oneitem">
                    <p>${match.accountno}</p>
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
                <form autocomplete="off" class="search-component" @submit=${ev => ev.preventDefault()}>
                    <div class="container">
                        <div class="search-customer">
                            <h2>Search Customer</h2>
                        </div>
                        <div class="account-number">
                            <lion-input name= "account number" id="search" label="${localize.msg('lit-html-example:accountnumber')}" .validators="${[new Pattern(/^[a-zA-Z\s]*$/), new Required()]}">Account Number</lion-input>
                            
                            <div id="match-list"></div>
                            <div id="nomatch"></div>
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






