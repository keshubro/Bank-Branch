
import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import {  Required, Pattern } from '@lion/form-core';
import { localize,LocalizeMixin } from '@lion/localize';

export class LoginComponent extends LocalizeMixin(LitElement){

    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
    }

    static get styles() {
        return css`
            .login-form{
                background-color: white;
            }

            .container{
                width: 500px;
                background-color: lightblue;
                box-shadow: 5px 10px 18px #888888;
                border-radius: 5px;
                height: 100%;
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

            .login{
                
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
            <lion-form>
                <form class="login-form" @submit=${ev => ev.preventDefault()}>
                    <div class="container">
                        <div class="title">
                            <h2>Login Details</h2>
                        </div>
                        <div class="username">
                            <lion-input name= "user-name" label="${localize.msg('lit-html-example:username')}" .validators="${[new Required()]}">Username</lion-input>
                        </div>
                        <div class="password">
                            <lion-input name= "password" label="${localize.msg('lit-html-example:password')}" .validators="${[new Pattern(/^[a-zA-Z\s]*$/), new Required()]}">Password</lion-input>
                        </div>
                        <div class="login">
                            <button type="submit" ><a href="/search">${localize.msg('lit-html-example:btn')}</a></button>
                        </div>
                    </div>
                </form>
            </lion-form>
        `;
    }

}

window.customElements.define('login-component', LoginComponent);





// import { LitElement, html } from "lit-element";
// import '@lion/button/lion-button.js';

// export class LoginComponent extends LitElement
// {
//     constructor()
//     {
//         super();
//     }

//     // updated()
//     // {
//     //     super.updated();
//     //     this.shadowRoot.querySelector('lion-button').addEventListener('click', this.btnClicked);
//     // }

//     // btnClicked()
//     // {
//     //     // debugger;
//     //     window.location.pathname="/about";
//     // }

//     render()
//     {
//         return html`
//             <div>Login Page</div>
//             <lion-button><a href="/about">Click me link</a></lion-button>
//             <button><a href="/about">Click me btn</a></button>
//             <a href="/about">Keshav</a>
//         `;
//     }
// }

// customElements.define('login-component', LoginComponent);


// {/* <button><a href="/about">Click me</a></button> */}
