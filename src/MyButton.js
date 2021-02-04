import { LitElement, html, css } from "lit-element";

export class MyButton extends LitElement
{
    static get properties()
    {
        return{
            btnColor: {type: String},
            btnTxt: {type: String}
        }
    }

    static get styles()
    {
        return css`
            button{
                font-weight: bold;
            }
        `;
    }
    render()
    {
        return html`<button>${this.btnTxt}</button>`;
    }
}