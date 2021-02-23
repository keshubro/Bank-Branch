import { LitElement, html, css } from "lit-element";

export class LogoutDialogComponent extends LitElement
{
    constructor()
    {
        super();
        console.log('cons');
    }

    static get styles(){
        return css`

        h3{
            padding:25px 25px 10px 25px;
        }
        p{
            padding-left:25px;
        }
        .dailog-container{
            width: 400px;
            background-color : black;
            border-radius: 4px;
            color:white;
            border:2px solid white;
        }

        lion-button {
            margin:5px;
            color: white;
            padding: 5px 20px;
            border-radius: 5px;
            cursor: pointer;
            background-color: dodgerblue;
        }

        .button-container{
            text-align: right;
            padding:25px;
        }
        #x-btn{
            background-color:black;
            color:white;
            float:right;
            margin:5px;
            font-size: 20px;
        }
        `;
    }

    updated(){

        this.shadowRoot.getElementById("x-btn").addEventListener('click',() =>{
            //console.log("x btn clicked");
            this.dispatchEvent(new CustomEvent('close-overlay', { bubbles: true }));
        });

        this.shadowRoot.getElementById("proceed-btn").addEventListener('click',() =>{
            //console.log("Proceed btn clicked");
            this.dispatchEvent(new CustomEvent('logout-event'));
        });

        this.shadowRoot.getElementById("cancel-btn").addEventListener('click',() =>{
           // console.log("close btn clicked");
            this.dispatchEvent(new CustomEvent('close-overlay', { bubbles: true }));
        });
    }

    render()
    {
        return html`
            <div class="dailog-container">
                <lion-button id="x-btn">x</lion-button>
                <h3>Are you sure!!</h3>
                <p><b>Do you want to logout?</b></p>
                <div class="button-container">
                    <lion-button id="proceed-btn">Proceed</lion-button>
                    <lion-button id="cancel-btn">Cancel</lion-button>
                </div>
            </div>
        `;
    }
}


customElements.define("logout-dialog-content", LogoutDialogComponent);