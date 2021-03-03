import { LitElement, html, css } from "lit-element";

export class StyledTooltipComponent extends LitElement
{
    constructor()
    {
        super();
    }

    static get styles()
    {
        return css`
            p{
                margin:0;
                padding:5px;
                color: rgb(255, 98, 0);
                background: black;
                background-color: black;
                color: #dee2e6;
                text-align: center;
                border-radius: 6px;
                font-size: 14px;
            }
        `;
    }

    render()
    {
        return html`
            <p>OTP sent to the registered mobile number</p>
        `;
    }
}

customElements.define('tooltip-component', StyledTooltipComponent);