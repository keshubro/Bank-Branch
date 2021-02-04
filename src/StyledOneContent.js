import { LitElement, html, css } from "lit-element";
import '@lion/dialog/lion-dialog.js'
import '@lion/button/lion-button.js';

export class StyledComponent extends LitElement
{
    constructor()
    {
        super();
    }

    static get styles()
    {
        return css`
            h3{
                text-align: center;
                font-weight: bold;
                color: rgb(212 189 189);
                margin: 55px;
            }

            .dialog-div{
                border: 1px solid;
                border-radius: 5px;
                background-color: rgb(21 16 16);
                height: 200px;
                width: 400px;
                position: relative;
            }

            #dlg-header{
                background-color: #6d84b4;
                color: white;
                font-size: 20px;
                padding: 10px;
                margin: 10px 10px 0px 10px;
            }

            #dlg-body{
                background-color: white;
                color: black;
                font-size: 14px;
                padding: 10px;
                margin: 0px 10px 0px 10px;
            }
            .yesno{
                position: absolute;
                bottom: 0;
                right: 0;
                height: 30px;
                width: 200px;
                padding-bottom: 15px;
            }

            lion-button{
                background-color: #888;
                justify-content: center;
                font-size: 16px;
            }

            .nobtn{
                position:absolute;
                right: 5px;
            }

            .nobtn, .yesbtn{
                border-radius: 5px;
                width: 90px;
                font-weight: bold;
                text-align: center;
            }

            .xbutton{
                border-radius: 5px;
                padding: 5px 8px;
                font-weight: bold;
                position: absolute;
                right: 0;
            }
            
            .xbutton, .yesbtn, .nobtn{
                cursor: pointer;
            }





            @media only screen and (max-width: 576px) {
                .dialog-div{
                    border: 1px solid;
                    border-radius: 5px;
                    background-color: rgb(21 16 16);
                    height: 200px;
                    width: 300px;
                    position: relative;
                }
              }
        `;
    }

    updated()
    {
        super.updated();

        this.shadowRoot.querySelector('.xbutton').onclick = (e) => {
            console.log('clicked x');
            this.dispatchEvent(new CustomEvent('close-overlay', {
                bubbles: true
            }));
        }

        this.shadowRoot.querySelector('.nobtn').onclick = (e) => {
            console.log('clicked x');
            this.dispatchEvent(new CustomEvent('close-overlay', {
                bubbles: true
            }));
        }

        this.shadowRoot.querySelector('.yesbtn').onclick = (e) => {
            console.log('clicked x');
            this.dispatchEvent(new CustomEvent('yesClicked', {
                bubbles: true
            }));
        }
    }


    render()
    {
        return html`
        <div class="dialog-div">
            
            <lion-button class="xbutton">x</lion-button>
            
            <h3>Are you sure you want to proceed ?</h3>
            
            <div class="yesno">
                <lion-button class="nobtn">No</lion-button>
                <lion-button class="yesbtn">Yes</lion-button>
            </div>
        </div>
        `;
    }
}

customElements.define('styled-dialog-content', StyledComponent);