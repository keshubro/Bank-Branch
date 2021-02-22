import { LitElement, html, css } from 'lit-element';
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/button/lion-button.js';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import {  Required } from '@lion/form-core';
import { localize,LocalizeMixin } from '@lion/localize';


export class OtpComponent extends LocalizeMixin(LitElement){

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
                //background-color: lightblue;
                //box-shadow: 5px 10px 18px #888888;
               // border-radius: 5px;
                height: 100%;
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
            
            h2{
                text-align: center;
            }

            a{
                text-decoration: none;
            }

            #errormessage{
                color: red;
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
            errorMessage: { type: String }
        };
    }

    
        
    render() {
        
        return html`
        <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">

            <div class="wrapper">
                <div class="title">
                    <h2>${localize.msg('lit-html-example:otpValidation')}</h2>
                </div>
                <div class="container">
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
                        <lion-button type="submit" >${localize.msg('lit-html-example:validate')}</lion-button>
                    </div>
                    <div id="errormessage">${this.errorMessage}</div>
                </div>
            </div>
    `;
    }
}

window.customElements.define('otp-component', OtpComponent);
