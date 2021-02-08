// Here the Login Page will go

import { LitElement, html } from "lit-element";
import '@lion/button/lion-button.js';

export class LoginComponent extends LitElement
{
    constructor()
    {
        super();
    }

    // updated()
    // {
    //     super.updated();
    //     this.shadowRoot.querySelector('lion-button').addEventListener('click', this.btnClicked);
    // }

    // btnClicked()
    // {
    //     // debugger;
    //     window.location.pathname="/about";
    // }

    render()
    {
        return html`
            <div>Login Page</div>
            <lion-button><a href="/about">Click me link</a></lion-button>
            <button><a href="/about">Click me btn</a></button>
            <a href="/about">Keshav</a>
        `;
    }
}

customElements.define('login-component', LoginComponent);


{/* <button><a href="/about">Click me</a></button> */}
