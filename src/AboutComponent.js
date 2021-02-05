// Just trying. Need to be deleted for the final project

import { LitElement, html, css } from "lit-element";

export class AboutComponent extends LitElement
{
    constructor()
    {
        super();
    }

    render()
    {
        return html`
            <h1>About Page</h1>
        `;
    }
}

customElements.define('about-component', AboutComponent);
