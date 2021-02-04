import { LitElement, html, css } from "lit-element";
import './fields-component';
import '@lion/button/lion-button.js';
import '@lion/radio-group/lion-radio-group.js';
import '@lion/radio-group/lion-radio.js';
import '@lion/select/lion-select.js';
import { localize, LocalizeMixin } from '@lion/localize';
import '@lion/dialog/lion-dialog.js';
import './StyledOneContent';

export class MainComponent extends LocalizeMixin(LitElement)
{
    constructor()
    {
        super();
    }

    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
      }

    static get styles()
    {
        return css`
            .main{
                min-height: 80vh;
            }
            .lform{
                width: 100%;
                box-shadow: 5px 10px 18px #888888;
                border-radius: 5px; 
            }
            form{
                                                                                                                
            }
            label{
                font-weight: bold;
            }
            #btn{
                border-radius: 5px;
                width: 15%;
            }

            .align-btn{
                text-align:center;
            }

            lion-dialog{
                width: 10px;
            }

            


            @media only screen and (max-width: 576px) {
                #btn{
                    width: 100%;
                }
            }

        `;
    }

    
    connectedCallback()
    {
        super.connectedCallback();
        console.log(this.shadowRoot);
        this.shadowRoot.addEventListener("check", function (e) {
            console.log('listend to check event');
            console.log(e);
        });
    }

    
    validationFn(firstName, lastName, gender, phone, email)
    {       
        console.log('validation function');
        if(firstName == '' || lastName == '' || gender == '' || phone == '' || email == '')
        {
            return false;
        }

        return true;
    }

    
    submitClicked(e)
    {   
        const firstName = this.shadowRoot.querySelector('#firstName').shadowRoot.querySelector('#firstName').value;
        const lastName = this.shadowRoot.querySelector('#lastName').shadowRoot.querySelector('#lastName').value;
        const gender = this.shadowRoot.querySelector('#gender').shadowRoot.querySelector('#gender').modelValue;
        const phone = this.shadowRoot.querySelector('#phone').shadowRoot.querySelector('#phone').value;
        const email = this.shadowRoot.querySelector('#email').shadowRoot.querySelector('#email').value;

        const notEmpty = this.validationFn(firstName, lastName, gender, phone, email);

        if(notEmpty)
        {
            console.log('not empty');
        }

        else
        {
            console.log('empty');
        }

        
    }

    changeRoute(e)
    {
        const firstName = this.shadowRoot.querySelector('#firstName').shadowRoot.querySelector('#firstName').value;
        const lastName = this.shadowRoot.querySelector('#lastName').shadowRoot.querySelector('#lastName').value;
        const gender = this.shadowRoot.querySelector('#gender').shadowRoot.querySelector('#gender').modelValue;
        const phone = this.shadowRoot.querySelector('#phone').shadowRoot.querySelector('#phone').value;
        const email = this.shadowRoot.querySelector('#email').shadowRoot.querySelector('#email').value;

        const notEmpty = this.validationFn(firstName, lastName, gender, phone, email);
        if(notEmpty)
        {
            localStorage.setItem('firstName', firstName);
            localStorage.setItem('lastName', lastName);
            localStorage.setItem('gender', gender);
            localStorage.setItem('phone', phone);
            localStorage.setItem('email', email);
            
            const pathName = '/details';
            this.dispatchEvent(new CustomEvent('routeChange', { detail: pathName }));
        }

        else
        {
            e.target.dispatchEvent(new Event('close-overlay', { bubbles: true }))
            alert('Please fill all the fields');
        }

        
    }
    
    render()
    {
        return html`
        <link rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap.min.css">
          

            <section class="main d-flex justify-content-center align-items-center">
                <div class="container-fluid">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-sm-6">
                            <lion-form class="lform">
                                <form id="frm" @submit=${this.submitClicked}>
                                    <div class="container">
                                        <div class="row mb-3">
                                            <div class="col-sm-3 col-xs-12">
                                                <label>${localize.msg('lit-html-example:firstName')} : </label>
                                            </div>
                                            <div class="col col-sm-9 col-xs-12">
                                                <fields-component id="firstName" requiredtype="text"></fields-component>  
                                            </div> 
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3 col-xs-12">
                                                <label>${localize.msg('lit-html-example:lastName')} : </label>
                                            </div>
                                            <div class="col-sm-9 col-xs-12">
                                                <fields-component id="lastName" requiredtype="text"></fields-component>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3 col-xs-12">
                                                <label>${localize.msg('lit-html-example:gender')} : </label>
                                            </div>
                                            <div class="col-sm-9 col-xs-12">
                                                <fields-component id="gender" requiredtype="radio"></fields-component>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-3 col-xs-12">
                                                <label>${localize.msg('lit-html-example:phone')} : </label>
                                            </div>
                                            <div class="col-sm-9 col-xs-12">
                                                <fields-component id="phone" requiredtype="phone"></fields-component>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-sm-3 col-xs-12">
                                                <label>${localize.msg('lit-html-example:email')} : </label>
                                            </div>
                                            <div class="col-sm-9 col-xs-12">
                                                <fields-component id="email" requiredtype="email"></fields-component>
                                            </div>
                                        </div>
                                        <div class="row justify-content-center mb-3">
                                            <div class="col align-btn">
                                                <lion-dialog .config=${{hidesOnOutsideClick: true, hidesOnEsc: true}}>
                                                    
                                                    <lion-button id='btn' class="justify-content-center" slot="invoker">${localize.msg('lit-html-example:submit')}</lion-button>
                                                    
                                                    <styled-dialog-content @yesClicked=${this.changeRoute} slot="content">  </styled-dialog-content>
                                                    
                                                </lion-dialog>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </lion-form>
                        </div>
                    </div>
            </section>
        `;
    }
}

customElements.define('main-component', MainComponent);





