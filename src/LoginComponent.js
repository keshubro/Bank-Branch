import { LitElement, html, css } from "lit-element";

import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import '@lion/fieldset/lion-fieldset.js';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import {  Required } from '@lion/form-core';
import { localize,LocalizeMixin } from '@lion/localize';
import { ajax } from '@lion/ajax';

class LoginComponent extends LocalizeMixin(LitElement){
    
    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
    }

    constructor() {
        super();
        this.errorMessage = null;
        loadDefaultFeedbackMessages();
    }

  static get styles(){
      return css`

        .big-image {
            height: 94vh;
            width: 100vw;
            position: relative;
            background-size: cover;
            background-position: 50% 50%;
            //background-image: url("https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1920&q=80");
            background-image: url("./images/bg.jpg");
          }
          
          .overlay {
            position: absolute;
            height: 100%;
            width: 100%;
            top: 0;
            left: 0;
            background: rgba(0, 0, 0, 0.65);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
          }
          
          .overlay h1 {
            font-size: 65px;
            letter-spacing: 0px;
            margin: 0 0 5px;
          }
          
          .overlay p {
            margin: 0;
            font-size: 28px;
          }

        //   .login-container{
        //     margin: 130px;
        //     width:350px;
        // }
        .cont{
            //width: 500px;
            //background-color: lightblue;
            //box-shadow: 5px 10px 18px #888888;
           // border-radius: 5px;
           //margin-top: 150px;
           // height: 100%;
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

        .form-control{
            padding: 0 0 0 5px;
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

        .input-label-prefix{
            display: block;
            margin-right: 8px;
        }

        .input-label{
            display: none;
        }

        

        @media only screen and (max-width: 576px) {
            .input-label{
                display: inline-block;
            }
            .input-label-prefix{
                display: none;
            }

            .input-label-suffix{
                display: block;
            }
        }

          
        

      `;
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
   
    <div class="big-image">
        <div class="overlay">
        <lion-form class="login-container" @submit=${this.authenticateUser} responsive>
                    <form class="login-form" @submit= ${(ev) =>ev.preventDefault()}>
                        <div class="cont">
                            <div class="title">
                                <h2>${localize.msg('lit-html-example:logindetails')}</h2>
                            </div>
                            <div class="container">
                                <div class="row d-flex align-items-end">
                                    <div class="col">
                                        <div class="username">
                                            <lion-input id="username" name="username" .fieldName="${localize.msg('lit-html-example:username')}" .validators="${[new Required(null, { getMessage: () => 'Please select a valid Username' })]}">
                                                <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:username')} :</span>
                                                <span slot="label" class="input-label">${localize.msg('lit-html-example:username')} :</span>
                                            </lion-input>
                                        </div>
                                    </div>
                                </div>
                                <div class="row d-flex align-items-end">
                                    <div class="col">
                                        <lion-input id="password" type="password" name="password" .validators="${[new Required(null, { getMessage: () => 'Please select a valid password' })]}">
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:password')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:password')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                            </div>
                            <div class="login">
                                <lion-button type="submit" >${localize.msg('lit-html-example:btn')}</lion-button>
                            </div>
                            <div id="errormessage">${this.errorMessage}</div>
                        </div>
                        
                    </div>
                </form>
            </lion-form>
           
        </div>
    </div>
                      
    `;
  }

  
}

window.customElements.define('login-component', LoginComponent);
