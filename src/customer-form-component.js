import { LitElement, html, css } from 'lit-element';
import { localize,LocalizeMixin } from '@lion/localize';
import '@lion/form/lion-form.js';
import '@lion/button/lion-button.js';
import '@lion/select/lion-select.js';
import '@lion/input/lion-input.js';
import '@lion/input-email/lion-input-email.js';
import '@lion/input-datepicker/lion-input-datepicker.js';
import { ajax } from '@lion/ajax';
import { nothing } from 'lit-html';


export class CustomerFormComponent extends LocalizeMixin(LitElement) {

    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
      }

    static get properties() {
        return{
            customerDetails: { type: Object },
            isLoading: { type: Boolean}
        }
    }

    
    static get styles() {
        return css`
            .form-container{
                 background-color : #e9ecef;
                 border:none;
                 font-size:17px;
                 width:500px;
            }

            lion-input-datepicker button{
                border: none;
            }

            .form-control{
                padding: 0 0 0 5px;
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
                text-align:right;
            }

            .input-label-prefix{
                display: block;
                margin-right: 8px;
            }

            .input-label{
                display: none;
            }

            @media only screen and (max-width: 576px) {
                .input-label{
                    display: inline-block;
                }
                .input-label-prefix{
                    display: none;
                }

                .input-label-suffix{
                    display: block;
                }
            }

           `;
    }
    
    connectedCallback(){
        super.connectedCallback();
        this.isLoading = true;
        
        /* console.log(location.search);
        const queryString=location.search;
        const urlParams = new URLSearchParams(queryString);
        const product = urlParams.get('custaccno');
        console.log(product); */


        console.log(location.hash);
        console.log(location.hash.slice(1));

        const cust_acc_no = location.hash.slice(1);

        //const cust_acc_no = window.location.params.id;
      
       //const cust_acc_no = sessionStorage.getItem('accno');
        const url = 'http://localhost:3000/customers?accountno=' + cust_acc_no;
        
        ajax
      .get(url)
      .then(response => {
       
        //this.isLoading = true;
        console.log("isLoading:"+this.isLoading);
        this.customerDetails=response.data;
        console.log("fetched details");
        console.log(this.customerDetails[0].name);
        //console.log(Object.keys(this.customerDetails).length);

      })
      .catch(error => {
        console.log("failed to fetch the data");
        console.log(error);
      })
      .finally(() => {
        console.log("finally block");
          this.isLoading=false;
          console.log("isLoading:"+this.isLoading);
      });
      
    }
  
    constructor() {
        super();
        this.isLoading = false;
        
    }

    backBtnHandler(){
        console.log("back button clicked");
        window.location.href = "/search";
    }

    updateBtnHandler(){
        console.log("update button clicked");
        
    }

    
    
    render() {
        return this.isLoading?  html`<div>Loading icon</div>`: 
         Object.keys(this.customerDetails).length > 0 ? html`
        <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
                    <lion-form class="form-container">
                        <form @submit= ${(ev) =>ev.preventDefault()}>
                            <div class="container">
                                <div class="row mb-2">
                                    <div class="col">
                                        <p style="font-size:20px;"><b> ${localize.msg('lit-html-example:personalDetalis')}</b></p>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].name}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:name')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:name')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].surname}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:surName')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:surName')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].dob}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:dob')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:dob')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].email}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:email')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:email')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].mobileno}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:mobileNo')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:mobileNo')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col d-flex align-items-end">
                                        <p style="font-size:20px;"><b>${localize.msg('lit-html-example:addressDetails')} </b></p>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].apartmentno}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:apartmentNo')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:apartmentNo')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].street}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:street')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:street')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].city}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:city')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:city')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].pincode}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:pincode')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:pincode')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].state}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg('lit-html-example:state')} :</span>
                                            <span slot="label" class="input-label">${localize.msg('lit-html-example:state')} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-button @click="${this.backBtnHandler}">${localize.msg('lit-html-example:back')}</lion-button>
                                    </div>
                                    <div class="col update">
                                        <lion-button @click="${this.updateBtnHandler}" id="updateBtn">${localize.msg('lit-html-example:update')}</lion-button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </form>
                    </lion-form>  
            
          `: nothing
    }

}

customElements.define("customer-form-component", CustomerFormComponent);



