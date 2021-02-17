import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import { ajax } from '@lion/ajax';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import { localize,LocalizeMixin } from '@lion/localize';
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
            
            .search-comp-container{
                width: 550px;
               
            }
           
            .search-customer{
                padding-top:15px;
            }
            
            lion-input{
                padding: 0px;
            }

            input{
                border-radius: 5px;
                border:1px solid black;
            }

            lion-button{
                background-color: green;
                color:white;
                border-radius:5px;
            }

            lion-button:hover {
                background-color: #057305c2;
                cursor:pointer;
            }

            
          
            .search{
                
                text-align: right;
                padding: 15px;
                font-size: 16px;
                font-weight: bold;
                outline: none; 
                
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

            .search-results-container{
                padding: 20px;
            }

        `

    }

    
    constructor(){
        super();
        this.customers = '';
        this.search = '';
        this.matchList = '';
        this.cards=[];
    }

    static get properties() {
        return{
            'type' : 'string',
            cards: { type: Array },
        }
    }

    firstUpdated(){
        super.firstUpdated();
        ajax
        .get('http://localhost:3000/customers')
        .then(response => {
            console.log(response.data);
            this.customers = response.data;
        });
    }

    updated()
    {
        super.updated();
        // The user should only be able to enter a number
        console.log(this.shadowRoot);
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

        this.search.addEventListener('input', () => this.searchStates(this.search.value).bind(this));
        this.matchList.addEventListener('click', this.itemClicked.bind(this));
    }

    itemClicked(e)
    {
        // debugger;
        this.search.value = e.target.parentElement.querySelector('input').value;
        this.matchList.innerHTML = '';
        console.log(this.search);
    }

    firstUpdated()
    {
        super.firstUpdated();

        ajax
        .get('http://localhost:3000/customers')
        .then(response => {
            // console.log(response.data);
            this.customers = response.data;
        });
    }

    searchStates(searchText)
    {
        

        let customers = this.customers;
        
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

   

    fetchDetails(accno){
        const url = 'http://localhost:3000/customers?accountno_like=' + accno;
        
        ajax
      .get(url)
      .then(response => {
        this.cards=response.data;
    
        if(this.cards.length < 1){
            this.shadowRoot.getElementById('alert-container').style.display='block';
            this.shadowRoot.getElementById('alert-container').innerHTML = `<p style="color:red">No match found !</p>`;
        }
        else{
            this.shadowRoot.getElementById('alert-container').style.display='none';
        }
      })
      .catch(error => {
        console.log("failed to fetch the data");
        console.log(error);
      });
    }

    searchBtnClicked(){
        this.matchList.innerHTML='';
        const accno = this.shadowRoot.getElementById('search').value;
        
        if(accno == ''){
            this.shadowRoot.getElementById('alert-container').style.display='block';
            this.shadowRoot.getElementById('alert-container').innerHTML = `<p style="color:red">Please enter a account number !!</p>`;
        }
        else{
            this.shadowRoot.getElementById('alert-container').style.display='none';
            this.fetchDetails(accno);
        }
        
    }

    

    render() {
        loadDefaultFeedbackMessages();

        return html`
            <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">

            <div class="search-comp-container">
                <lion-form >
                    <form autocomplete="off" class="search-component" @submit=${ev => ev.preventDefault()}>
                        <div class="container">
                            <div class="search-customer mb-3">
                                <h2>${localize.msg('lit-html-example:searchHeading')}</h2>
                            </div>
                            
                            <div class="row d-flex justify-content-center align-items-center">
                                <div class="col-sm-4 col-xs-12">
                                    <label>${localize.msg('lit-html-example:accountnumber')} :</label>
                                </div>
                                <div class="col-sm-8 col-xs-12">
                                    <lion-input name= "account number" id="search">Account Number</lion-input>
                                </div>
                            </div>

                            <div id="match-list"></div>

                            
                            <div class="search">  
                                <lion-button  @click=${this.searchBtnClicked}>${localize.msg('lit-html-example:search')}</lion-button>
                            </div>
                        </div>
                        
                    </form>
                </lion-form>
                
                <div class="search-results-container">

                <div id="alert-container">
            
            </div>
           
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


