import { LitElement, html, css } from 'lit-element';
import { ajax } from '@lion/ajax';
import './Otp-validation-component';
import '@lion/dialog/lion-dialog.js';

export class updatedDetailsComponent extends LitElement{
    
    static get properties() {
        return{
            updatedCustomerDetails: { type: Object },
            customerAccountNo: {type: String},
            customerId : {type: String}
        }
    }

    static get styles() {
        return css`
        .update-wrapper{
            display:flex;
            height: calc(100vh - 70px);
            align-items:center;
        }
            .update-container{
                 /*background-color : pink;
                 border:none; */
                 font-size:20px;
                 width:330px;
                // border: 3px solid #d87628;
                //padding: 25px;
                border-radius: 5px;
                background: #f8f9fac2;
                box-shadow: 5px 10px 8px #adb5bd;
            }
            .heading{
                background-image: linear-gradient(0deg, lightgrey, rgb(248, 249, 250));
                padding:15px 0px;
            }

            .details{
                margin-top: 15px;
            }

          
            p[id="key"]{
                text-transform: capitalize;
            }

            h2{
                margin:0px;
                text-align: center;
                font-size: 28px;
               // padding-bottom: 20px;
            }

            lion-button {
                margin:10px 10px 20px 10px;
                color: white;
                padding: 5px 20px;
                border-radius: 5px;
                cursor: pointer;
                background-color: grey;
            }
            lion-button:hover {
                background-color: rgba(162, 160, 160, 0.97);
            }

            #updateBtn {
                background-color: green;
            }
            #updateBtn:hover {
                background-color: rgba(11, 156, 11, 0.9);
            }

            .update{
                text-align:center;
            }

             @media only screen and (min-width: 700px) {
                .update-container{
                    width:500px;
                }
                

            }

            
            

           `;
    }

    constructor(){
        super();
        
    }

    connectedCallback(){
        super.connectedCallback();
        console.log("UDC connected");
        //console.log(location.search);
        const queryString=location.search;
        const urlParams = new URLSearchParams(queryString);
        const customerSetails = urlParams.get('custUpdatedDetails');
        //console.log(product);
        this.updatedCustomerDetails = JSON.parse(customerSetails);
        console.log(this.updatedCustomerDetails);

         this.customerAccountNo = urlParams.get('custAccNo');
        console.log(this.customerAccountNo);

        this.customerId = urlParams.get('custId');;
        console.log(this.customerId);
    }

    updated(){
        console.log("UDP updated");
    }

    editBtnHandler(){
        console.log("edit btn handler");
        window.location.href='/custform/#'+this.customerAccountNo;
    }

    onUpdateHandler(){
        console.log("Update handler");

        const data = this.updatedCustomerDetails;
        const url = 'http://localhost:3000/customers/'+ this.customerId;
        
          ajax
            .patch(url, data)
            .then(response => {
              console.log("PATCH successful");
            })
            .catch(error => {
              console.log(error);
            });
    }

    render() {
        return html`
        <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
        <div class="update-wrapper">
            <div class="container update-container">
            <div class="row heading">
            <h2><strong>Updated Details</strong></h2>
            </div>
            <div class="row details">
            ${Object.entries(this.updatedCustomerDetails).map(entry => html`
            <div class="row mb-2 updated-info">
                <div class="col-6 d-flex justify-content-end">
                    <p id="key"><b>${entry[0]+':'}</b></p>
                </div>
                <div class="col-6">
                    <p>${entry[1]}</p>
                </div>
            </div>
            `, )}

            </div>

            <div class="row mb-3">
                <div class="col update">
                    <lion-button @click="${this.editBtnHandler}">Edit</lion-button>
                </div>
                <div class="col update">
                    <lion-dialog .config=${{ hidesOnOutsideClick: true, hidesOnEsc: true }}>
                        <lion-button slot="invoker" id="updateBtn">Update</lion-button>
                        <otp-validation-component slot="content"></otp-validation-component>
                    </lion-dialog>                 
                </div>
            </div>
            </div>
        </div>
        `;
    }

}

window.customElements.define('updated-details-component', updatedDetailsComponent);


