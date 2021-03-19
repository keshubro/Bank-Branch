import { LitElement, html, css } from "lit-element";
import { localize, LocalizeMixin } from "@lion/localize";
import "@lion/form/lion-form.js";
import "@lion/button/lion-button.js";
import "@lion/select/lion-select.js";
import "@lion/input/lion-input.js";
import "@lion/input-email/lion-input-email.js";
import "@lion/input-datepicker/lion-input-datepicker.js";
import "@lion/select-rich/lion-select-rich.js";
import "@lion/listbox/lion-options.js";
import "@lion/listbox/lion-option.js";
import "@lion/dialog/lion-dialog.js";
import "./style-dialog-content.js";

import { loadDefaultFeedbackMessages } from "@lion/validate-messages";
import { IsDate, IsEmail, Required, Validator } from "@lion/form-core";

import { ajax } from "@lion/ajax";
import { nothing } from "lit-html";
// const fs = require('fs');
// import { fs } from 'fs';
// console.log('fs');   
// console.log(fs);

class MyValidator extends Validator {
    static get validatorName() {
        return "myValidator";
    }

    execute(modelValue) {
        console.log(modelValue.length);
        if (isNaN(modelValue)) {
            return true;
        } else if (modelValue.length != 10) {
            return true;
        } else {
            return false;
        }
    }

    static getMessage({ fieldName, modelValue }) {
        return "Please enter a valid mobile no";
    }
}

export class CustomerFormComponent extends LocalizeMixin(LitElement) {
    static get localizeNamespaces() {
        return [
            {
                "lit-html-example": (locale) =>
                    import(`../translations/${locale}.js`),
            },
            ...super.localizeNamespaces,
        ];
    }

    static get properties() {
        return {
            customerDetails: { type: Object },
            isLoading: { type: Boolean},
            customerImage: {type: Object},
            profileChanged: {type: String}
        }
    }

    static get styles() {
        return css`
            .form-container {
                background-color: #e9ecef;
                border: none;
                font-size: 17px;
                width: 350px;
                margin-top: 25px;
                // width:500px;
            }

            img {
                border-radius: 50%;
                width:120px;
                height:120px;
            }
            lion-input-datepicker button {
                border: none;
            }

            .form-control {
                padding: 0 0 0 5px;
            }

            lion-input ::slotted(*) {
                padding: 5px;
            }

            lion-button {
                margin: 10px 10px 20px 10px;
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

            .update {
                text-align: right;
            }

            .input-label-prefix {
                display: block;
                margin-right: 8px;
                //padding:3px;
            }

            .input-label {
                display: none;
            }

            #stateSel,
            #citySel {
                width: 100%;
                border: 1px solid #ced4da;
                padding: 2px;
                border-radius: 5px;
            }

            #otherState {
                display: none;
            }

            #otherCity {
                display: none;
            }

            #imageUpload{
                margin: 15px 15px 0 0;
            }

            .loader {
                border: 16px solid white;
                border-radius: 50%;
                border-top: 16px solid grey;
                width: 60px;
                height: 60px;
                margin-top: 150px;
                -webkit-animation: spin 2s linear infinite; /* Safari */
                animation: spin 2s linear infinite;
            }

            /* Safari */
            @-webkit-keyframes spin {
                0% {
                    -webkit-transform: rotate(0deg);
                }
                100% {
                    -webkit-transform: rotate(360deg);
                }
            }

            @keyframes spin {
                0% {
                    transform: rotate(0deg);
                }
                100% {
                    transform: rotate(360deg);
                }
            }

            @media only screen and (max-width: 576px) {
                .input-label {
                    display: inline-block;
                }
                .input-label-prefix {
                    display: none;
                }

                .input-label-suffix {
                    display: block;
                }
            }

            @media only screen and (min-width: 700px) {
                .form-container {
                    width: 550px;
                }
            }
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        this.isLoading = true;
        const cust_acc_no = location.hash.slice(1);
        const url = "http://localhost:3000/customers?accountno=" + cust_acc_no;

        ajax.get(url)
            .then((response) => {
                //this.isLoading = true;
                console.log("isLoading:" + this.isLoading);
                this.customerDetails = response.data;
                console.log("fetched details");
                console.log(this.customerDetails[0].accountno);

                //console.log(Object.keys(this.customerDetails).length);
            })
            .catch((error) => {
                console.log("failed to fetch the data");
                console.log(error);
            })
            .finally(() => {
                console.log("finally block");
                setTimeout(() => (this.isLoading = false), 2000);
                //this.isLoading=false;
                console.log("isLoading:" + this.isLoading);
            });

        ajax.get("http://localhost:3000/states")
            .then((response) => {
                console.log(response);
                this.stateObject = response.data;
                console.log(this.stateObject);
                console.log(this.shadowRoot.querySelector(".container"));

                this.stateObject.forEach((state) => {
                    
                    if (state.stateName == this.customerDetails[0].state) {
                        this.listOfCities = state.cities;
                        state.cities.forEach((city) => {
                            if (city === this.customerDetails[0].city) {

                                this.cityNotInTheList = false;
                            } 
                            // else {
                            //     let citySel = this.shadowRoot.getElementById(
                            //         "citySel"
                            //     );
                            //     console.log("citySel :");
                            //     console.log(citySel.options);
                            //     citySel.options[
                            //         citySel.options.length
                            //     ] = new Option("Others", "Others");
                            //     citySel.options[0].remove();
                            //     this.shadowRoot.querySelector(
                            //         "#otherCity"
                            //     ).style.display = "block";
                            //     this.shadowRoot.querySelector(
                            //         "#otherCityInput"
                            //     ).modelValue = this.customerDetails[0].city;
                            // }
                        });
                    }
                    
                });
            })
            .catch((error) => {
                console.log("failed to fetch the data");
                console.log(error);
            });
    }

    constructor() {
        super();
        this.isLoading = false;
        this.updatedDetails = {};
        this.selectedState='';
        this.selectedCity = '';
        this.stateId = '';
        this.profileChanged = "false";
        this.cityNotInTheList = true;
        this.listOfCities = [];
    }

    backBtnHandler() {
        console.log("back button clicked");
        window.location.href = "/search";
    }

    updateBtnHandler(e) {
        console.log("update button clicked");
        console.log(this.updatedDetails);
       // e.target.dispatchEvent(new Event('close-overlay', { bubbles: true }));

       const isEmpty = this.validateFiels();
       console.log("isEmpty"+isEmpty);

       let valueChanged = Object.keys(this.updatedDetails).length;
       if(this.profileChanged == "true"){
           valueChanged = 1;
       }
       if(valueChanged > 0){

       
       if(!(isEmpty)){
            const custAccNo = this.customerDetails[0].accountno;
            const customerId= this.customerDetails[0].id;
            window.location.href='/updated/?custUpdatedDetails='+ JSON.stringify(this.updatedDetails)+'&custAccNo='+ custAccNo +'&custId=' + customerId + '&stateId=' + this.stateId + '&profileChanged=' + this.profileChanged;
       }
       else {
           alert("All fields are required");
           e.target.dispatchEvent(new Event('close-overlay', { bubbles: true }));
       }
       
       }
       else {
        alert("Please change a value to update");
        e.target.dispatchEvent(new Event('close-overlay', { bubbles: true }));
       }
      // window.location.href='/updated';
        
    }

    validateFiels() {
        const name = this.shadowRoot.getElementById("name").value;
        const surName = this.shadowRoot.getElementById("surname").value;
        const dob = this.shadowRoot.getElementById("dob").value;
        const emailID = this.shadowRoot.getElementById("email").value;
        const mobileNo = this.shadowRoot.getElementById("mobile").value;
        const apartmentNo = this.shadowRoot.getElementById("apartmentno").value;
        const street = this.shadowRoot.getElementById("street").value;
        const city = this.shadowRoot.getElementById("citySel").value;
        const pincode = this.shadowRoot.getElementById("pincode").value;
        const state = this.shadowRoot.getElementById("stateSel").value;
        const otherState = this.shadowRoot.getElementById("otherState");
        const otherCity = this.shadowRoot.getElementById("otherCity");
        const otherStateValue = this.shadowRoot.getElementById(
            "otherStateInput"
        ).value;
        const otherCityValue = this.shadowRoot.getElementById("otherCityInput")
            .value;

        console.log(city);

        if (city == "Please select a city") {
            return true;
        }

        if (otherCity.style.display == "block") {
            if (otherCityValue !== "") {
                this.updatedDetails.city = otherCityValue;
                sessionStorage.setItem("newCity", "yes");
            } else {
                return true;
            }
        }
        
        
        
        if (name == '' || surName == '' || dob == '' || emailID == '' || mobileNo == '' || apartmentNo == '' || street == '' || pincode == ''){
            // console.log(name, surName, dob, emailID, mobileNo, apartmentNo, street, city, pincode, state);
            return true;
        } else {
            return false;
        }
    }

    updated() {
        super.updated();
        if (this.cityNotInTheList) {
            let citySel = this.shadowRoot.getElementById('citySel');
            citySel.options[citySel.options.length] = new Option('Others', 'Others');
            citySel.options[0].remove();
            this.shadowRoot.querySelector('#otherCity').style.display = 'block';
            this.shadowRoot.querySelector('#otherCityInput').modelValue = this.customerDetails[0].city;
        } else {
            // debugger;
            this.shadowRoot.getElementById(
                "citySel"
            ).value = this.customerDetails[0].city;
        }

        let stateObject = this.stateObject;
        let customerDetails = this.customerDetails;
        let stateSel = this.shadowRoot.getElementById("stateSel");
        let citySel = this.shadowRoot.getElementById("citySel");
        // debugger;
        console.log(stateSel);
        console.log(this.customerDetails[0].state);
        stateObject.forEach((state) => {
            stateSel.options[stateSel.options.length] = new Option(
                state.stateName,
                state.stateName
            );
        });

        

        this.listOfCities.forEach(function (city) {
            citySel.options[citySel.options.length] = new Option(
                city,
                city
            );
        });

        stateSel.addEventListener("change", this.stateChanged.bind(this));
    }

    stateChanged(e) {
        this.shadowRoot.querySelector('#otherCity').style.display = 'none';
        this.shadowRoot.querySelector('#otherCityInput').value = '';
        this.updatedDetails.state = e.target.value;
        let stateObject = this.stateObject;
        let citySel = this.shadowRoot.getElementById("citySel");
        console.log("stateChanged :" + e.target.value);

        console.log(this.stateObject);
        console.log(stateObject);

        this.stateObject.forEach((state) => {
            if (state.stateName == e.target.value) {
                this.stateId = state.id;
            }
        });
        citySel.length = 1; // remove all options bar first
        citySel.options[citySel.options.length] = new Option(
            "Please select a city",
            "Please select a city"
        );
        citySel.options[0].remove();

        this.stateObject.forEach((state) => {
            console.log(state);
            console.log("val : " + e.target.value);
            if (e.target.value == state.stateName) {
                state.cities.forEach(function (city) {
                    citySel.options[citySel.options.length] = new Option(
                        city,
                        city
                    );
                });
            }
            // citySel.options[citySel.options.length] = new Option(city, city);
        });

        citySel.options[citySel.options.length] = new Option(
            "Others",
            "Others"
        );

        citySel.addEventListener(
            "change",
            function (e) {
                if (e.target.value == "Others") {
                    this.selectedState = "Others";
                    // this.shadowRoot.getElementById('otherState').style.display = 'block';
                    this.shadowRoot.getElementById("otherCity").style.display =
                        "block";
                    // this.shadowRoot.getElementById('mainCity').style.display = 'none';
                    // this.updatedDetails.city = this.shadowRoot.querySelector('#otherCity').value;
                } else {
                    this.shadowRoot.getElementById("otherCity").style.display =
                        "none";
                }
                this.updatedDetails.city = e.target.value;
            }.bind(this)
        );
    }

     
    loadFile(e){
        console.log("load file function");
        let image = this.shadowRoot.getElementById('profileImg');
	    image.src = URL.createObjectURL(e.target.files[0]);
        console.log(e.target.files[0]);

        this.profileChanged = "true";
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            //console.log(reader.result);
            localStorage.setItem("ProfileImg",reader.result);
        };
        
        reader.readAsDataURL(file);

    }
    
    
    render() {
        loadDefaultFeedbackMessages();
        return this.isLoading
            ? html`<div class="loader"></div>`
            : Object.keys(this.customerDetails).length > 0
            ? html`
        <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
                    <lion-form class="form-container">
                        <form @submit= ${(ev) => ev.preventDefault()}>
                            <div class="container">
                                <div class="row mb-2">
                                    <div class="col">
                                        <p style="font-size:20px;"><b> ${localize.msg(
                                            "lit-html-example:personalDetalis"
                                        )}</b></p>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                    <img id="profileImg" src=${"./images/" + this.customerDetails[0].profileimg}>
                                    </div>
                                    <div class="col-12">
                                    <input type="file" id="imageUpload" @change=${this.loadFile}>
                                    </div>

                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" id="name" name="Name" .modelValue=${
                                            this.customerDetails[0].name
                                        } @model-value-changed=${({
                  target,
              }) => {
                  this.updatedDetails.name = target.value;
              }} .validators="${[
                  new Required(null, {
                      getMessage: () => "Please select a valid name",
                  }),
              ]}">
                                            <span slot="prefix" class="input-label-prefix">${localize.msg(
                                                "lit-html-example:name"
                                            )} :</span>
                                            <span slot="label" class="input-label">${localize.msg(
                                                "lit-html-example:name"
                                            )} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" id="surname" name="SurName" .modelValue=${
                                            this.customerDetails[0].surname
                                        } @model-value-changed=${({
                  target,
              }) => {
                  this.updatedDetails.surname = target.value;
              }} .validators="${[
                  new Required(null, {
                      getMessage: () => "Please select a valid surname",
                  }),
              ]}">
                                            <span slot="prefix" class="input-label-prefix">${localize.msg(
                                                "lit-html-example:surName"
                                            )} :</span>
                                            <span slot="label" class="input-label">${localize.msg(
                                                "lit-html-example:surName"
                                            )} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" id="dob" name="Dob" .modelValue=${
                                            this.customerDetails[0].dob
                                        } @model-value-changed=${({
                  target,
              }) => {
                  this.updatedDetails.dob = target.value;
              }}>
                                            <span slot="prefix" class="input-label-prefix">${localize.msg(
                                                "lit-html-example:dob"
                                            )} :</span>
                                            <span slot="label" class="input-label">${localize.msg(
                                                "lit-html-example:dob"
                                            )} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" id="email" name="email" .modelValue=${
                                            this.customerDetails[0].email
                                        } @model-value-changed=${({
                  target,
              }) => {
                  this.updatedDetails.email = target.value;
              }} .validators="${[
                  new IsEmail(null, {
                      getMessage: () => "Please select a valid email",
                  }),
              ]}">
                                            <span slot="prefix" class="input-label-prefix">${localize.msg(
                                                "lit-html-example:email"
                                            )} :</span>
                                            <span slot="label" class="input-label">${localize.msg(
                                                "lit-html-example:email"
                                            )} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-4">
                                    <div class="col">
                                        <lion-input class="input-field" id="mobile" name="mobile" .modelValue=${
                                            this.customerDetails[0].mobileno
                                        } @model-value-changed=${({
                  target,
              }) => {
                  this.updatedDetails.mobileno = target.value;
              }} .validators="${[
                  new Required(null, {
                      getMessage: () => "Please select a valid mobile number",
                  }),
              ]}">
                                            <span slot="prefix" class="input-label-prefix">${localize.msg(
                                                "lit-html-example:mobileNo"
                                            )} :</span>
                                            <span slot="label" class="input-label">${localize.msg(
                                                "lit-html-example:mobileNo"
                                            )} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col d-flex align-items-end">
                                        <p style="font-size:20px;"><b>${localize.msg(
                                            "lit-html-example:addressDetails"
                                        )} </b></p>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-2 col-xs-12" style="padding: 0 0 0 12px;">
                                        <span slot="prefix" class="input-label-prefix">${localize.msg(
                                            "lit-html-example:state"
                                        )} :</span>
                                        <span slot="label" class="input-label">${localize.msg(
                                            "lit-html-example:state"
                                        )} :</span>
                                    </div>
                                    <div class="col-md-10 col-xs-12">
                                        <select name="state" label="hello" id="stateSel" size="1">
                                            <option value="" selected="selected">${
                                                this.customerDetails[0].state
                                            }</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mb-3" id="otherState">
                                    <div class="col">
                                        <lion-input class="input-field" id="otherStateInput" name="otherState" .validators="${[
                                            new Required(null, {
                                                getMessage: () =>
                                                    "Please select a valid state",
                                            }),
                                        ]}">
                                            <span slot="prefix" class="input-label-prefix">${localize.msg(
                                                "lit-html-example:otherState"
                                            )} :</span>
                                            <span slot="label" class="input-label">${localize.msg(
                                                "lit-html-example:otherState"
                                            )} :</span>
                                        </lion-input>
                                    </div>
                                </div>

                                <div class="row mb-3" id="mainCity">
                                    <div class="col-md-2 col-xs-12" style="padding: 0 0 0 12px;">
                                        <span slot="prefix" class="input-label-prefix">${localize.msg(
                                            "lit-html-example:city"
                                        )} :</span>
                                        <span slot="label" class="input-label">${localize.msg(
                                            "lit-html-example:city"
                                        )} :</span>
                                    </div>
                                    <div class="col-md-10 col-xs-12">
                                        <select name="city" id="citySel" size="1">
                                            <option selected="selected">${
                                                this.customerDetails[0].city
                                            }</option>
                                        </select>           
                                    </div>
                                </div>
                                <div class="row mb-3" id="otherCity">
                                    <div class="col">
                                        <lion-input class="input-field" id="otherCityInput" name="otherCity" .validators="${[
                                            new Required(null, {
                                                getMessage: () =>
                                                    "Please select a valid city",
                                            }),
                                        ]}">
                                            <span slot="prefix" class="input-label-prefix">${localize.msg(
                                                "lit-html-example:otherCity"
                                            )} :</span>
                                            <span slot="label" class="input-label">${localize.msg(
                                                "lit-html-example:otherCity"
                                            )} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" id="pincode" name="pincode" .modelValue=${
                                            this.customerDetails[0].pincode
                                        } @model-value-changed=${({
                  target,
              }) => {
                  this.updatedDetails.pincode = target.value;
              }} .validators="${[
                  new Required(null, {
                      getMessage: () => "Please select a valid pincode",
                  }),
              ]}">
                                            <span slot="prefix" class="input-label-prefix">${localize.msg(
                                                "lit-html-example:pincode"
                                            )} :</span>
                                            <span slot="label" class="input-label">${localize.msg(
                                                "lit-html-example:pincode"
                                            )} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" id="apartmentno" name="apartmentno" .modelValue=${
                                            this.customerDetails[0].apartmentno
                                        } @model-value-changed=${({
                  target,
              }) => {
                  this.updatedDetails.apartmentno = target.value;
              }} .validators="${[
                  new Required(null, {
                      getMessage: () =>
                          "Please select a valid apartment number",
                  }),
              ]}">
                                            <span slot="prefix" class="input-label-prefix">${localize.msg(
                                                "lit-html-example:apartmentNo"
                                            )} :</span>
                                            <span slot="label" class="input-label">${localize.msg(
                                                "lit-html-example:apartmentNo"
                                            )} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-input class="input-field" id="street" name="street" .modelValue=${
                                            this.customerDetails[0].street
                                        } @model-value-changed=${({
                  target,
              }) => {
                  this.updatedDetails.street = target.value;
              }} .validators="${[
                  new Required(null, {
                      getMessage: () => "Please select a valid street",
                  }),
              ]}">
                                            <span slot="prefix" class="input-label-prefix">${localize.msg(
                                                "lit-html-example:street"
                                            )} :</span>
                                            <span slot="label" class="input-label">${localize.msg(
                                                "lit-html-example:street"
                                            )} :</span>
                                        </lion-input>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col">
                                        <lion-button @click="${
                                            this.backBtnHandler
                                        }">${localize.msg(
                  "lit-html-example:back"
              )}</lion-button>
                                    </div>
                                    <div class="col update">
                                        <lion-dialog .config=${{
                                            hidesOnOutsideClick: true,
                                            hidesOnEsc: true,
                                        }}>
                                            <lion-button slot="invoker" id="updateBtn">${localize.msg(
                                                "lit-html-example:update"
                                            )}</lion-button>
                                            <styled-dialog-content .updatedCustomerDetails="${
                                                this.updatedDetails
                                            }" @summary-page=${
                  this.updateBtnHandler
              } slot="content"></styled-dialog-content>
                                        </lion-dialog>
                                       
                                    </div>
                                </div>
                            </div>
                            </div>
                        </form>
                    </lion-form>  
            
          `
            : nothing;
    }
}

customElements.define("customer-form-component", CustomerFormComponent);
