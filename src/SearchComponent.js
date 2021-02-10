import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import { ajax } from '@lion/ajax';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import {  Required, Pattern } from '@lion/form-core';
import { localize,LocalizeMixin } from '@lion/localize';
import { ajax } from '@lion/ajax';
import './card-comp.js';


export class SearchComponent extends LocalizeMixin(LitElement){

    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
    }

    static get styles() {
        return css`

<<<<<<< HEAD
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
            
=======
            .search-comp-container{
                background: #e9ecef;
               
            }
            /*
>>>>>>> 61ecd1e (search functionality added)
            .search-component{
                background-color: white;
            }

            .container{
                width: 500px;
                background-color: lightblue;
                box-shadow: 5px 10px 18px #888888;
                border-radius: 5px;
            }
            */
            .search-customer{
                padding-top:15px;
            }
            
            lion-input{
                padding: 0px;
            }

            input{
                border-radius: 5px;
            }

            lion-button{
                background-color: green;
                color:white;
                border-radius:5px;
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
               /* text-transform: uppercase;*/
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
            
            h1{
                margin:0px;
            }

            h2{
                text-align: center;
                margin:0px;
            }

            card-comp {
                margin: 12px;
            }

            .cards-container{
                display:flex;
                flex-wrap: wrap;
            }

            .searchresults{
               // background: lightgrey;
                padding: 20px;
            }

            #nomatch{
                display: none;
            }

            

        `

    }

    
    constructor(){
        super();
<<<<<<< HEAD
        this.search = '';
        this.matchList = '';
=======
        this.cards=[];
>>>>>>> 61ecd1e (search functionality added)
    }

    static get properties() {
        return{
            'type' : 'string',
            cards: { type: Array },
        }
    }

<<<<<<< HEAD
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

   

=======
    fetchDetails(accno){
        const url = 'http://localhost:3000/customers?accountno_like=' + accno;
        console.log(url);

        ajax
      .get(url)
      .then(response => {
        console.log(response.data);
        this.cards=response.data;
      })
      .catch(error => {
        console.log("failed to fetch the data");
        console.log(error);
      });
    }

    searchBtnClicked(){
        console.log("serach btn clicked");
        const accno = this.shadowRoot.getElementById('accountno').value;
        console.log(accno);
        this.fetchDetails(accno);
    }

>>>>>>> 61ecd1e (search functionality added)
    render() {
        loadDefaultFeedbackMessages();
        return html`
            <div class="search-comp-container">
            <lion-form >
<<<<<<< HEAD
                <form autocomplete="off" class="search-component" @submit=${ev => ev.preventDefault()}>
                    <div class="container">
=======
                <form @submit=${ev => ev.preventDefault()}>
                    <div>
>>>>>>> 61ecd1e (search functionality added)
                        <div class="search-customer">
                            <h2>Search Customer</h2>
                        </div>
                        <div class="account-number">
<<<<<<< HEAD
                            <lion-input name= "account number" id="search" label="${localize.msg('lit-html-example:accountnumber')}" .validators="${[new Pattern(/^[a-zA-Z\s]*$/), new Required()]}">Account Number</lion-input>
                            
                            <div id="match-list"></div>
                            <div id="nomatch"></div>
=======
                            <lion-input id="accountno" name= "account number" label="${localize.msg('lit-html-example:accountnumber')}">Account Number</lion-input>
>>>>>>> 61ecd1e (search functionality added)
                        </div>
                        <div class="search">    
                            <lion-button @click=${this.searchBtnClicked}>${localize.msg('lit-html-example:search')}</lion-button>
                        </div>
                    </div>
                    
                </form>
            </lion-form>
            <div class="searchresults">
           
            <div class="cards-container">
                ${this.cards.map(
                    card => html`
                    <card-comp .name=${card.name} .accountno=${card.accountno}></card-comp>
                    `,
                )}
            </div>
            
            </div>

            </div>
            
        `;
    }

}

window.customElements.define('search-component', SearchComponent);





// .validators="${[new Pattern(/^[a-zA-Z\s]*$/), new Required()]}"
