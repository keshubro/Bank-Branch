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
                padding:0 0 0 15px;
                color: rgb(255, 98, 0);
            }
        `;
    }

    render()
    {
        return html`
            <p>OTP sent !</p>
        `;
    }
}

customElements.define('tooltip-component', StyledTooltipComponent);