import { LitElement, html, css } from 'lit-element';
import { localize,LocalizeMixin } from '@lion/localize';
import '@lion/form/lion-form.js';
import '@lion/button/lion-button.js';
import '@lion/select/lion-select.js';
import '@lion/input/lion-input.js';
import '@lion/input-email/lion-input-email.js';
import '@lion/input-datepicker/lion-input-datepicker.js';


export class CustomerFormComponent extends LocalizeMixin(LitElement) {

    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
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
    
  
    constructor() {
        super();
    }

    
    render() {
        return html`
        <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
                    <lion-form class="form-container">
                        <form>
                            <div class="container">
                                <div class="row mb-2">
                                    <div class="col">
                                        <p style="font-size:20px;"><b> ${localize.msg('lit-html-example:personalDetalis')}</b></p>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" name="Name" label="${localize.msg('lit-html-example:name')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="SurName" label="${localize.msg('lit-html-example:surName')}"></lion-input>
                                    </div>
                                </div>
                                 <div class="row mb-3">
                                    <div class="col">
                                        <lion-input-datepicker label="${localize.msg('lit-html-example:dob')}" name="DOB"></lion-input-datepicker>
                                    </div>
                                </div>
                                 <div class="row mb-3">
                                    <div class="col">
                                        <lion-input-email name="email" label="${localize.msg('lit-html-example:email')}"></lion-input-email>
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <div class="col">
                                        <lion-input name="mobileNo" label="${localize.msg('lit-html-example:mobileNo')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-2">
                                    <div class="col">
                                        <p style="font-size:20px;"><b>${localize.msg('lit-html-example:addressDetails')} </b></p>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="apartment" label="${localize.msg('lit-html-example:apartmentNo')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="street" label="${localize.msg('lit-html-example:street')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="city" label="${localize.msg('lit-html-example:city')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="pincode" label="${localize.msg('lit-html-example:pincode')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input name="state" label="${localize.msg('lit-html-example:state')}"></lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-button>${localize.msg('lit-html-example:back')}</lion-button>
                                    </div>
                                    <div class="col update">
                                        <lion-button id="updateBtn">${localize.msg('lit-html-example:update')}</lion-button>
                                    </div>
                                </div>
                            </div>
                            </div>
                        </form>
                    </lion-form>  
            
          `;
    }

}

customElements.define("customer-form-component", CustomerFormComponent);



