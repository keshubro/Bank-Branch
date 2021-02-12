import { LitElement, html, css } from "lit-element";

class cardComp extends LitElement {
    static get properties() {
        return {
          name: { type: String },
          accountno : { type: String }
          
        };
      }
    constructor() {
        super();
    }

  static get styles(){
      return css`
        .card-items {
            display: flex;
            padding : 10px;
            flex-flow : column;
            background-color: white;
            flex:100%;
            border-radius: 4px;
            box-shadow: 5px 10px 8px #888888;
           font-size:18px;
        }

        .card-items:hover{
            background-color: #dee2e6;
            font-size: 20px;
            cursor:pointer;
        }
        .card-items > * {
            padding: 8px;
            border-bottom: 2px solid lightgrey;
            
            text-align: center;
        }

        #accno {
            border:none;
        }

        

      `;
  }

  updated(){
      this.shadowRoot.getElementById('card-items').addEventListener('click',this.cardClicked);
  }

  cardClicked(){
      window.location.href='/details';
  }


  render() {
    return html`
   
		<div class="card-items" id="card-items"> 
            <div><b>${this.name}</b></div>
            <div id="accno">${this.accountno}</div>  
        </div>       
                      
    `;
  }

  
}

customElements.define("card-comp", cardComp);
