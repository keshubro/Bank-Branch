import { LitElement, html, css } from "lit-element";
import '@lion/dialog/lion-dialog.js';
import './StyledOneContent';

export class TrialComponent extends LitElement
{
    constructor()
    {
        super();
    }

    static get styles()
    {
        return css`
           
        `;
    }

    

    render()
    {
        console.log('trial');
        return html`
        <h1>Helldo</h1>
        <lion-dialog .config=${{
            placementMode: 'global',
            viewportConfig: { placement: 'center' },
            }}>
            <button slot="invoker">
              Click me
            </button>
            <styled-dialog-content slot="content">
                
            </styled-dialog-content>
            
          </lion-dialog>
        
        `;
    }
}

customElements.define('trial-component', TrialComponent);

// <styled-component><span slot="hi">Keshav</span></styled-component>