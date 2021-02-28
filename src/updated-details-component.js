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
            .update-container{
                 /*background-color : pink;
                 border:none; */
                 font-size:20px;
                 //width:500px;

                 border: 3px solid #d87628;
                padding: 25px;
                border-radius: 5px;
                box-shadow: 5px 10px 8px #adb5bd;
            }

            h2{
                margin-top: 20px;
                text-align: center;
                padding-bottom: 20px;
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
            <div class="update-container">
            <h2>Updated Details</h2>
            
            <div class="details container">
            ${Object.entries(this.updatedCustomerDetails).map(entry => html`
            <div class="row mb-2">
                <div class="col-6 d-flex justify-content-end">
                    <p>${entry[0]+':'}</p>
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
        `;
    }

}

window.customElements.define('updated-details-component', updatedDetailsComponent);


