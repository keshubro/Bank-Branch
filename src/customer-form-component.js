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
                                <div class="row mb-3 d-flex justify-content-center align-items-end">
                                    <div class="col-sm-4 col-xs-12">
                                        <label>${localize.msg('lit-html-example:name')} :</label>
                                    </div>
                                    <div class="col-sm-8 col-xs-12">
                                            <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].name}></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3 justify-content-center align-items-end">
                                    <div class="col-sm-4 col-xs-12">    
                                        <label>${localize.msg('lit-html-example:surName')} :</label>
                                    </div>
                                    <div class="col-sm-8 col-xs-12">
                                        <lion-input name="SurName" .modelValue=${this.customerDetails[0].surname}></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3 justify-content-center align-items-end">
                                    <div class="col-sm-4 col-xs-12">
                                        <label>${localize.msg('lit-html-example:dob')} :</label>
                                    </div>
                                    <div class="col-sm-8 col-xs-12">
                                        <lion-input-datepicker .modelValue=${new Date(this.customerDetails[0].dob)} name="DOB"></lion-input-datepicker>
                                    </div>
                                </div>
                                <div class="row mb-3 justify-content-center align-items-end">
                                    <div class="col-sm-4 col-xs-12">
                                        <label>${localize.msg('lit-html-example:email')} :</label>
                                    </div>
                                    <div class="col-sm-8 col-xs-12">
                                        <lion-input-email name="email" .modelValue=${this.customerDetails[0].email}></lion-input-email>
                                    </div>
                                </div>
                                <div class="row mb-3 justify-content-center align-items-end">
                                    <div class="col-sm-4 col-xs-12">
                                        <label>${localize.msg('lit-html-example:mobileNo')} :</label>
                                    </div>
                                    <div class="col-sm-8 col-xs-12">
                                        <lion-input name="mobileNo" .modelValue=${this.customerDetails[0].mobileno}></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col">
                                        <p style="font-size:20px;"><b>${localize.msg('lit-html-example:addressDetails')} </b></p>
                                    </div>
                                </div>
                                <div class="row mb-3 justify-content-center align-items-end">
                                    <div class="col-sm-4 col-xs-12">
                                        <label>${localize.msg('lit-html-example:apartmentNo')} :</label>
                                    </div>
                                    <div class="col-sm-8 col-xs-12">
                                        <lion-input name="apartment" .modelValue=${this.customerDetails[0].apartmentno}></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3 justify-content-center align-items-end">
                                    <div class="col-sm-4 col-xs-12">
                                        <label>${localize.msg('lit-html-example:street')} :</label>
                                    </div>
                                    <div class="col-sm-8 col-xs-12">
                                        <lion-input name="street" .modelValue=${this.customerDetails[0].street}></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3 justify-content-center align-items-end">
                                    <div class="col-sm-4 col-xs-12">
                                        <label>${localize.msg('lit-html-example:city')} :</label>
                                    </div>
                                    <div class="col-sm-8 col-xs-12">
                                        <lion-input name="city" .modelValue=${this.customerDetails[0].city}></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3 justify-content-center align-items-end">
                                    <div class="col-sm-4 col-xs-12">
                                        <label>${localize.msg('lit-html-example:pincode')} :</label>
                                    </div>
                                    <div class="col-sm-8 col-xs-12">
                                        <lion-input name="pincode" .modelValue=${this.customerDetails[0].pincode}></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3 justify-content-center align-items-end">
                                    <div class="col-sm-4 col-xs-12">
                                        <label>${localize.msg('lit-html-example:state')} :</label>
                                    </div>
                                    <div class="col-sm-8 col-xs-12">
                                        <lion-input name="state" .modelValue=${this.customerDetails[0].state}></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-button @click="${this.backBtnHandler}">${localize.msg('lit-html-example:back')}</lion-button>
                                    </div>
                                    <div class="col update">
                                        <lion-button @click="${this.updateBtnHandler}"id="updateBtn">${localize.msg('lit-html-example:update')}</lion-button>
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



