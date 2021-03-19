import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import '@lion/tooltip/lion-tooltip.js';
import '@lion/icon/lion-icon.js';
import info from './images/info-circle-solid.js';
// import homeIcon from './images/home-solid.js';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import {  Required } from '@lion/form-core';
import { localize,LocalizeMixin } from '@lion/localize';
import { ajax } from '@lion/ajax';
import './StyledTooltipComponent';


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
                width: 350px;
                //box-shadow: 5px 10px 18px #888888;
                height: 100%;
                background-color : #f7f3f2;
                border-radius: 4px;
                color:black;
                border:2px solid white;
            }
            

            input{
                border-radius: 5px;
            }

            button{
                margin: 0px;
                font-size: 14px;
                height:30px;
                border: 1px solid #fff; 
                background: transparent;
                color: white;
            }

            button.info-tooltip{
                color: black;
                border: none;
                text-align: center;
            }

            lion-button{
                background-color: #5ea15ec2;
                color:black;
                border-radius:5px;
                margin:5px;
                padding: 5px 20px;
                border-radius: 5px;
                cursor: pointer;
                /* background-color: dodgerblue; */
            }

            lion-button:hover {
                background-color: #1e881ec2;;
                cursor:pointer;
            }

            .validate{
                
                text-align: center;
                padding: 15px 0;
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
                text-align: center;
                color: #FF0000;
            }

            #x-btn{
            background-color:#f7f3f2;
            color:#000000;
            float: right;
            margin:5px;
            font-size: 20px;

            .button-container{
            text-align: center;
            /* padding-bottom:25px; */

            
            }
            @media only screen and (min-width: 576px) {
            .cont{
                width: 30vw;
            }

        }

            
        `

    }

    constructor(){
        super();
        this.errorMessage = null;
        loadDefaultFeedbackMessages();
        this.stateId = '';
        this.newArr = '';
        this.stateData = '';
    }


    static get properties() {
        return{
            errorMessage: { type: String },
            updatedCustomerDetails: { type: Object },
            customerAccountNo: {type: String},
            customerId : {type: String},
            profileChanged : {type: String}
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

        this.customerId = urlParams.get('custId');
        this.stateId = urlParams.get('stateId');
        console.log(this.customerId);

        this.profileChanged = urlParams.get('profileChanged');
        console.log(this.profileChanged);

        const newCustImg = localStorage.getItem("ProfileImg");

        

        const stateUrl = 'http://localhost:3000/states/'+ this.stateId;

            
        if(this.profileChanged == "true"){
            console.log("before post request");
            const imgName = "profile" + this.customerId;
            const data = {};
            data[imgName] = newCustImg;
            const updateImgUrl = "http://localhost:3000/image";
            ajax
            .post(updateImgUrl,data)
            .then(response => {
                console.log("post request successful");
                console.log(response.data);
               // debugger
                const updatedProfile = response.data;
                //debugger
                console.log(typeof(updatedProfile));
                
                this.updatedCustomerDetails.profileimg = updatedProfile['fileName'];
                console.log(this.updatedCustomerDetails);
               
                this.saveCustomerDetails();
            })
            .catch(error => {
                console.log(error);
              });


        }else{
            this.saveCustomerDetails();
        }
        
         
            
        }else{
            this.errorMessage = "Enter a valid OTP";
        }
        
    }

    saveCustomerDetails(){
        const data = this.updatedCustomerDetails;
        const url = 'http://localhost:3000/customers/'+ this.customerId;
        ajax
        .patch(url, data)
        .then(response => {
          console.log("PATCH successful");
          localStorage.removeItem('ProfileImg');
          window.location.href = '/success';
          
        })
        .catch(error => {
          console.log(error);
        });
    }

    updated(){
        this.shadowRoot.querySelector('#cancel-btn').addEventListener('click', ()=>{
            this.dispatchEvent(new CustomEvent( 'close-overlay', { bubbles: true } ));
        });

        this.shadowRoot.querySelector('#x-btn').addEventListener('click', ()=>{
            this.dispatchEvent(new CustomEvent( 'close-overlay', { bubbles: true } ));
        });

    }
          
    handleInputChange(){
            this.errorMessage = "";

    }
        
    render() {
        
        return html`

        <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">

            <div id="alert-cont" class="cont">
                <div class="row d-flex justify-content-center pt-1 pb-3">
                    <div class="col-11">
                        <div class="title">
                            <h3><strong>${localize.msg('lit-html-example:otpValidation')}</strong></h3>
                        </div>
                    </div>
                    <div class="col-1">
                        <lion-button id="x-btn">x</lion-button>
                    </div>
                </div>
                <div class="container-fluid dailog-cont">
                    
                    <div class="row d-flex justify-content-center align-items-center">
                        <div class="col-12">
                            <label>${localize.msg('lit-html-example:otpCode')} 
                            <lion-tooltip has-arrow .config=${{ popperConfig: { placement: 'top' } }}>
                                <button slot="invoker" class="info-tooltip"  id="bottom-tooltip"><lion-icon aria-label="Pointing left" .svg="${info}" id="logoutIcon"  @click=${this.logoutClicked}></button>
                                <tooltip-component slot="content" class="demo-tooltip-content"></tooltip-component>
                            </lion-tooltip>
                            :</label>
                            
                            
                        </div>
                        
                        
                        <div class="col-12">
                            <div class="otpCode">
                                <lion-input id="otpCode" name="otpCode" type="password" @model-value-changed="${this.handleInputChange}" .fieldName="${localize.msg('lit-html-example:otpCode')}" .validators="${[new Required(null, { getMessage: () => 'Please enter a valid OTP' })]}"></lion-input>
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