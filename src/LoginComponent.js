
import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import {  Required, Pattern } from '@lion/form-core';
import { localize,LocalizeMixin } from '@lion/localize';
import { ajax } from '@lion/ajax';



export class LoginComponent extends LocalizeMixin(LitElement){

    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
    }

    static get styles() {
        return css`

            .cont{
                width: 500px;
                //background-color: lightblue;
                //box-shadow: 5px 10px 18px #888888;
               // border-radius: 5px;
                height: 100%;
            }
            
            lion-input{
                padding-top: 15px;
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

            lion-button{
                background-color: green;
                color:white;
                border-radius:5px;
            }

            lion-button:hover {
                background-color: #057305c2;
                cursor:pointer;
            }

            .login{
                
                text-align: right;
                padding: 15px;
                font-size: 16px;
                font-weight: bold;
                outline: none; 
            }
            
            h2{
                text-align: center;
            }

            a{
                text-decoration: none;
            }

            #errormessage{
                color: red;
            }

        `

    }

    constructor(){
        super();
        this.errorMessage = null;
        loadDefaultFeedbackMessages();
    }


    static get properties() {
        return{
            errorMessage: { type: String }
        };
    }

        
    authenticateUser(ev){

        ev.preventDefault()

        const formData = ev.target.serializedValue;
        
        const url = 'http://localhost:3000/auth/login';

        const username = this.shadowRoot.getElementById('username').value;
        const password = this.shadowRoot.getElementById('password').value;
        
        if(username && password){

            ajax
            .post(url,formData)
            
            .then(response => {
                this.errorMessage = null;
                sessionStorage.setItem("username", username);
                window.location.href = "/search";
            })
            .catch(error => {
                this.errorMessage = "Invalid Username or Password";
            });
        }else{
           console.log("field is empty"); 
        }
         
    }

    render() {
        
        return html`
        <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">

            <lion-form @submit=${this.authenticateUser}>
                <form class="login-form" @submit= ${(ev) =>ev.preventDefault()}>
                    <div class="cont">
                        <div class="title">
                            <h2>${localize.msg('lit-html-example:logindetails')}</h2>
                        </div>
                        <div class="container">
                            <div class="row d-flex justify-content-center align-items-center">
                                <div class="col-sm-3 col-xs-12">
                                    <label>${localize.msg('lit-html-example:username')} :</label>
                                </div>
                                <div class="col-sm-9 col-xs-12">
                                    <div class="username">
                                        <lion-input id="username" name="username" .fieldName="${localize.msg('lit-html-example:username')}" .validators="${[new Required(null, { getMessage: () => 'Please select a valid Username' })]}"></lion-input>
                                    </div>
                                </div>
                            </div>
                            <div class="row d-flex justify-content-center align-items-center">
                                <div class="col-sm-3 col-xs-12">
                                    <label>${localize.msg('lit-html-example:password')} :</label>
                                </div>
                                <div class="col-sm-9 col-xs-12">
                                        <lion-input id="password" type="password" name="password" .validators="${[new Required(null, { getMessage: () => 'Please select a valid password' })]}">Password</lion-input>
                                </div>
                            </div>
                        </div>
                        <div class="login">
                            <lion-button type="submit" >${localize.msg('lit-html-example:btn')}</lion-button>
                        </div>
                        <div id="errormessage">${this.errorMessage}</div>
                    </div>
                </form>
            </lion-form>
        `;
    }

}

window.customElements.define('login-component', LoginComponent);
