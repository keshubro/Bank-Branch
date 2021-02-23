import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import {  Required } from '@lion/form-core';
import { localize,LocalizeMixin } from '@lion/localize';
import { ajax } from '@lion/ajax';


export class OtpValidationComponent extends LocalizeMixin(LitElement){

    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
    }

    static get styles() {
        return css`

            .cont{
                width: 500px;
                //box-shadow: 5px 10px 18px #888888;
                height: 100%;
                background-color : black;
                border-radius: 4px;
                color:white;
                border:2px solid white;
            }
            
            lion-input{
                padding-top: 15px;
            }


            input{
                border-radius: 5px;
            }

            button{
                margin: 0px;
                font-size: 14px;
                height:30px;
                border: 1px solid #fff; 
                background-color: transparent;
            }

            lion-button{
                background-color: green;
                color:white;
                border-radius:5px;
                margin:5px;
                padding: 5px 20px;
                border-radius: 5px;
                cursor: pointer;
                background-color: dodgerblue;
            }

            lion-button:hover {
                background-color: #057305c2;
                cursor:pointer;
            }

            .validate{
                
                text-align: right;
                padding: 15px;
                font-size: 16px;
                font-weight: bold;
                outline: none; 
            }
            
            h3{
                text-align: center;
            }

            a{
                text-decoration: none;
            }

            #errormessage{
                color: red;
            }

            #x-btn{
            background-color:black;
            color:white;
            float: right;
            margin:5px;
            font-size: 20px;

            .button-container{
            text-align: right;
            padding:25px;

            
        }

        `

    }

    constructor(){
        super();
        this.errorMessage = null;
        loadDefaultFeedbackMessages();
    }


    static get properties() {
        return{
            errorMessage: { type: String },
            updatedCustomerDetails: { type: Object },
            customerAccountNo: {type: String},
            customerId : {type: String}
        }
    };
    

    // onValidateeHandler(){
    //     console.log("Update handler");
    //     const body = {
    //           surname: 'Kennedy',
    //           apartmentno: '300',
    //       };

    //     const data = this.updatedCustomerDetails;
    //     const url = 'http://localhost:3000/customers/'+ this.customerId;
        
    //       ajax
    //         .patch(url, data)
    //         .then(response => {
    //           console.log("PATCH successful");
    //           window.location.href = '/success';
    //         })
    //         .catch(error => {
    //           console.log(error);
    //         });
    // }

    validateOtp(){
        if(this.shadowRoot.querySelector('#otpCode').value == '123456'){

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

        const data = this.updatedCustomerDetails;
        const url = 'http://localhost:3000/customers/'+ this.customerId;
        
          ajax
            .patch(url, data)
            .then(response => {
              console.log("PATCH successful");
              window.location.href = '/success';
              
            })
            .catch(error => {
              console.log(error);
            });
            
        }
    }
    updated(){
        this.shadowRoot.querySelector('#cancel-btn').addEventListener('click', ()=>{
            this.dispatchEvent(new CustomEvent( 'close-overlay', { bubbles: true } ));
        });

        this.shadowRoot.querySelector('#x-btn').addEventListener('click', ()=>{
            this.dispatchEvent(new CustomEvent( 'close-overlay', { bubbles: true } ));
        });

    }
          
    
        
    render() {
        
        return html`

        <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">

            <div class="cont">
                <lion-button id="x-btn">x</lion-button>
                <div class="title">
                    <h3>${localize.msg('lit-html-example:otpValidation')}</h3>
                </div>
                <div class="container dailog-cont">
                    
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col-sm-3 col-xs-12">
                            <label>${localize.msg('lit-html-example:otpCode')} :</label>
                        </div>
                        <div class="col-sm-9 col-xs-12">
                            <div class="otpCode">
                                <lion-input id="otpCode" name="otpCode" .fieldName="${localize.msg('lit-html-example:otpCode')}" .validators="${[new Required(null, { getMessage: () => 'Please select a valid OTP' })]}"></lion-input>
                            </div>
                        </div>
                    </div>
                    <div class="validate">
                        <div class="btn-container">
                            <lion-button id="validate" type="submit" @click = ${this.validateOtp}>${localize.msg('lit-html-example:validate')}</lion-button>
                            <lion-button id="cancel-btn" @click = ${this.cancelOption}>Cancel</lion-button>
                        </div>
                    </div>
                    <div id="errormessage">${this.errorMessage}</div>
                </div>
            </div>
    `;
    }
}

window.customElements.define('otp-validation-component', OtpValidationComponent);
