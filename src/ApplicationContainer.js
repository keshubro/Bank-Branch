import { LitElement, html, css } from "lit-element";
import "./header-component";
import "./LoginComponent";
import "./SearchComponent";
import "./customer-form-component";
// import './OtpValidationComponent';
import "./updated-details-component";
import "./Otp-validation-component";
import "./SuccessComponent";
import './LandingComponent';
import './QueriesComponent';

//import './demo-component';
import { Router } from "@vaadin/router";

export class ApplicationContainer extends LitElement {
    constructor() {
        super();
        this.customerImage = {};
    }

    static get properties()
    {
        return{
            customerInfo : { type: Object},
            customerImage: { type: Object }
        }
    }

    static get styles() {
        return css`
            /*.outlet{
                min-height: 90vh;

            }*/
            #header-div {
                //min-height: 10vh;
                //height:50px;
                position: sticky;
                top: 0;
            }
            /* .app-container{
                height:90%;
            }
            */
            .body-container {
                // background: black;
                //height:90%;
                // height: calc(100% - 50px);
                overflow-x: hidden;
                //overflow:none;
                //overflow-y: hidden;
            }
        `;
    }


    firstUpdated() {

        super.firstUpdated();

        const outlet = this.shadowRoot.getElementById("outlet");
        const router = new Router(outlet);

        this.router = router;
        //this.router.render


        router.setRoutes([
            {path: '/', component: 'login-component'},
            {path: '/landingpage', component: 'landing-component'},
            {path: '/queries', component: 'queries-component'},
            {path: '/search', component: 'search-component'},
            {path: '/custform', action: (context, commands) => {
                //debugger
                const stubElement = commands.component('customer-form-component');
                stubElement.custAccno = this.customerInfo.accno;
                return stubElement;
                
             }},
            {path: '/updated', action: (context, commands) => {
                //debugger
                const stubElement = commands.component('updated-details-component');
                
                // if (Object.keys(this.customerImage).length != 0){
                //     debugger
                //     stubElement.customerImage = this.customerImage;
                // }

                if (this.customerImage) {
                    stubElement.customerImage = this.customerImage;
                }
               
                stubElement.customerAccountNo = this.customerInfo.accno;
                stubElement.customerId = this.customerInfo.custId;
                stubElement.updatedCustomerDetails = this.customerInfo.updatedDetails;
                return stubElement;
            }},
            {path: '/success', component: 'success-component'}
        ]);
    }

    connectedCallback()
    {
        super.connectedCallback();
        this.addEventListener('image-updated', this.imageUpdated);
        this.addEventListener('change-route', (e)=>{
           // this.router.render(e.detail.path);

            if(e.detail.routeData){
                
                this.customerInfo = e.detail.routeData;
            }

            let obj = {
                pathname: e.detail.route,
                search: '',
                hash: ''
            };
            
            
            // this.router.render(e.detail.route,'otp','valid', true);
            this.router.render(obj, true);

        })
    }

    imageUpdated(e)
    {
        debugger;
        this.customerImage = e.detail;
    }

    disconnectedCallback()
    {
        super.disconnectedCallback();
        this.removeEventListener('image-updated', this.imageUpdated);
        //this.removeEventListener('image-updated', this.imageUpdated);
    }

    render() {
        return html`
            <link
                rel="stylesheet"
                type="text/css"
                href="./node_modules/bootstrap/dist/css/bootstrap.min.css"
            />
            <base href="/" />

            <div id="header-div">
                <header-component></header-component>
            </div>

            <div
                class="body-container d-flex justify-content-center align-items-center"
            >
                <div id="outlet" class="outlet">
                    <!-- Here Vaadin.Router inserts the current page content -->
                </div>
            </div>
        `;
    }
}

customElements.define("application-container", ApplicationContainer);
