import { LitElement, html, css } from "lit-element";

export class HeaderComponent extends LitElement
{
    constructor()
    {
        super();
    }

    static get styles()
    {
        return css`
            h1{
                text-align: center;
                margin: 0;
            }
        `;
    }

    render()
    {
        return html`
            <h1>Header</h1>
        `;
    }
}

customElements.define('header-component', HeaderComponent);