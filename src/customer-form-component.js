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
                padding: .375rem .75rem;
                border: 1px solid #ced4da;
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
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" .modelValue=${this.customerDetails[0].name} label="${localize.msg('lit-html-example:name')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="SurName" .modelValue=${this.customerDetails[0].surname} label="${localize.msg('lit-html-example:surName')}"></lion-input>
                                    </div>
                                </div>
                                 <div class="row mb-3">
                                    <div class="col">
                                        <lion-input-datepicker .modelValue=${new Date(this.customerDetails[0].dob)} label="${localize.msg('lit-html-example:dob')}" name="DOB"></lion-input-datepicker>
                                    </div>
                                </div>
                                 <div class="row mb-3">
                                    <div class="col">
                                        <lion-input-email name="email" .modelValue=${this.customerDetails[0].email} label="${localize.msg('lit-html-example:email')}"></lion-input-email>
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <div class="col">
                                        <lion-input name="mobileNo" .modelValue=${this.customerDetails[0].mobileno} label="${localize.msg('lit-html-example:mobileNo')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col">
                                        <p style="font-size:20px;"><b>${localize.msg('lit-html-example:addressDetails')} </b></p>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="apartment" .modelValue=${this.customerDetails[0].apartmentno} label="${localize.msg('lit-html-example:apartmentNo')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="street" .modelValue=${this.customerDetails[0].street} label="${localize.msg('lit-html-example:street')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="city" .modelValue=${this.customerDetails[0].city} label="${localize.msg('lit-html-example:city')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="pincode" .modelValue=${this.customerDetails[0].pincode} label="${localize.msg('lit-html-example:pincode')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="state" .modelValue=${this.customerDetails[0].state} label="${localize.msg('lit-html-example:state')}"></lion-input>
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



