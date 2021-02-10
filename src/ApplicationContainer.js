import { LitElement, html, css } from "lit-element";
import './header-component';
import './LoginComponent';
import './SearchComponent';
import { Router } from '@vaadin/router';

export class ApplicationContainer extends LitElement
{
    constructor()
    {
        super();
    }

    static get styles()
    {
        return css`
<<<<<<< HEAD
            .outlet{
                min-height: 90vh;

            }
=======
           
>>>>>>> 61ecd1e (search functionality added)

            

            #header-div{
                min-height: 10vh;
            }

        `;
    }

    updated()
    {
        super.updated();

        const outlet = this.shadowRoot.getElementById('outlet');
        const router = new Router(outlet);

        router.setRoutes([
            {path: '/', component: 'login-component'},
            {path: '/search', component: 'search-component'},
            {path: '/details', component: 'personal-details-component'},
            {path: '/updated', component: 'updated-details-component'},
            {path: '/otpvalidation', component: 'otp-validation-component'},
            {path: '/success', component: 'success-component'},
            {path: '/about', component: 'about-component'},
        ]);
    }

    render()
    {
        return html`
            <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">

            <div id="header-div">
                <header-component></header-component>
            </div>
            
            <div id="outlet" class="outlet d-flex justify-content-center align-items-center">
                <!-- Here Vaadin.Router inserts the current page content -->
            </div>
            
        `;
    }
}

customElements.define('application-container', ApplicationContainer);