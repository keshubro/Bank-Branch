import { LitElement, html, css } from "lit-element";

class cardComp extends LitElement {
    static get properties() {
        return {
            name: { type: String },
            accountno: { type: String },
            profileimg: { type: String },
        };
    }
    constructor() {
        super();
        this.accountno = "";
        this.msg = "hi";
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

        .card-data {
          border:none;
        }

        img{
          border-radius:50%;
          width:120px;
          height:120px;
        }
        #accno {
            border:none;
        }

        

      `;
  }

    updated() {
        
        this.shadowRoot
            .getElementById("card-items")
            .addEventListener("click", () => {
                console.log("card clicked");
                console.log(this.accountno);

                sessionStorage.setItem("accno", this.accountno);

                const custAccno = {
                  accno: this.accountno
                }

                this.dispatchEvent(new CustomEvent('change-route',{bubbles: true, composed: true, detail: {
                  route: '/custform',
                  routeData: custAccno
  
              }}));

               // window.location.href = "/custform/#" + this.accountno;

                //const url = '/custform/'+this.accountno;
                //window.location.href= '/custform/'+this.accountno;
                //window.location.href='/details';

                //window.location.href='/details/'+this.accountno;

                /* const obj = { name:'Divya', lastname: 'Ram'};
        window.location.href='/custform/?custaccno='+obj; */
            });
        //console.log(this.accountno);
    }

    //   cardClicked(){
    //       //window.location.href='/details/'+this.accountno;
    //       console.log("card clicked fun called");
    //       console.log(this.accountno);
    //       console.log(this.msg);
    //       //window.location.href='/details';
    //   }

    render() {
        return html`
            <div class="card-items" id="card-items">
                <div class="card-data">
                    <img src=${"./images/" + this.profileimg} />
                </div>
                <div><b>${this.name}</b></div>
                <div id="accno">${this.accountno}</div>
            </div>
        `;
    }
}

customElements.define("card-comp", cardComp);
