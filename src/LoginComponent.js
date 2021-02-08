// Here the Login Page will go


import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import {  Required, Pattern } from '@lion/form-core';



const formSubmit =(ev) => {
    const formData = ev.target.serializedValue;
    console.log(formData);
}

export class LoginComponent extends LitElement{

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
            <lion-form @submit=${formSubmit}>
                <form class="login-form" @submit=${ev => ev.preventDefault()}>
                    <div>
                        <h2>Login Details</h2>
                        <lion-input name= "user-name" label="User Name" .validators="${[new Required()]}">Username</lion-input>
                        <lion-input name= "password" label="Password" .validators="${[new Pattern(/^[a-zA-Z\s]*$/), new Required()]}">Password</lion-input>
                        <button type="submit" ><a href="/search">Login</a></button>

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
