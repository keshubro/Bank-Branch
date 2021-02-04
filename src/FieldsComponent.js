import { LitElement, html, css } from "lit-element";
import '@lion/form/lion-form.js';
import '@lion/input/lion-input.js';
import '@lion/radio-group/lion-radio-group.js';
import '@lion/radio-group/lion-radio.js';
import '@lion/input-email/lion-input-email.js';
import '@lion/button/lion-button.js';
import { loadDefaultFeedbackMessages } from '@lion/validate-messages';
import { Validator } from '@lion/form-core';


export class FieldsComponent extends LitElement
{
    constructor()
    {
        super();
    }

    static get properties()
    {
        return {
            requiredType: { type: String },
            id: { type: String }
          };
    }

    static get styles()
    {
        return css`
            lion-input{
               
            }
            lion-button{
                background-color: #888888;
                border-radius: 5px;
                transition: background-color 0.2s, border 0.2s, color 0.2s;
            }
            lion-button:hover{
                cursor: pointer;
                background-color: rgba(155, 154, 154, 0.94);
            }  
            lion-radio{
                dispay: flex;
                align-items: center;
            }   
        `;
    }

    updated()
    {
        // console.log(this.shadowRoot.querySelector('#firstName'));
        
    }

    render()
    {   
        // console.log(this.attachShadow({mode: open}));
        loadDefaultFeedbackMessages();
        if(this.requiredType === 'text')
        {
            return html`
                <lion-input id=${this.id}></lion-input>
            `;
        }
        else if(this.requiredType === 'radio')
        {
            return html`
                <lion-radio-group id=${this.id} name="gender">
                    <lion-radio label="Male" .choiceValue="${'Male'}" name="Male"></lion-radio>
                    <lion-radio label="Female" .choiceValue="${'Female'}" name="Female"></lion-radio>
                </lion-radio-group>
            `;  
        }
        else if(this.requiredType === 'phone')
        {
            return html`
                <lion-input id=${this.id} .validators="${[new MyPhoneNumberValidator()]}"></lion-input>
            `;
        }
        else if(this.requiredType === 'email')
        {
            return html`
                <lion-input-email id=${this.id}></lion-input-email>
            `;
        }
        else if(this.requiredType === 'bttn')
        {
            return html`
                <lion-button id=${this.id}>Register</lion-button>
            `;
        }
    }
}

class MyPhoneNumberValidator extends Validator 
{
    execute(modelValue) 
    {
        if(isNaN(modelValue) || modelValue.length != 10)
        {
            return true;
        }
        return false;
    }

    static getMessage() 
    {
      return html`<div style="color:red">Enter a valid phone number</div>`;
    }
  }

// Lion input for firstName, lastName
// Radio group for gender
// 
// input-email for email
