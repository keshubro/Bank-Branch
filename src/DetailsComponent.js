import { LitElement, html, css } from "lit-element";
import { localize, LocalizeMixin } from '@lion/localize';

export class DetailsComponent extends LocalizeMixin(LitElement)
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
                min-height: 90vh;
            }
            .lform{
                width: 75%;
                box-shadow: 5px 10px 18px #888888;
                border-radius: 5px; 
            }
           
            #bold-label{
                font-weight: bold;
            }
            
        `;
    }

    render()
    {
        return html`
        <link rel="stylesheet" type="text/css" href="node_modules/bootstrap/dist/css/bootstrap.min.css">

        <section class="main d-flex justify-content-center align-items-center">
                <div class="container-fluid">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-sm-5 d-flex justify-content-center">
                            <lion-form class="lform">
                                <form id="frm" @submit=${this.submitClicked}>
                                    <div class="container">
                                        <div class="row mb-3">
                                            <div class="col-sm-6 col-xs-12">
                                                <label>${localize.msg('lit-html-example:firstName')} : </label>
                                            </div>
                                            <div class="col col-sm-6 col-xs-12">
                                                <label id="bold-label">${localStorage.getItem('firstName')}</label>
                                            </div> 
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-6 col-xs-12">
                                                <label>${localize.msg('lit-html-example:lastName')} : </label>
                                            </div>
                                            <div class="col-sm-6 col-xs-12">
                                                <label id="bold-label">${localStorage.getItem('lastName')}</label>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-6 col-xs-12">
                                                <label>${localize.msg('lit-html-example:gender')} : </label>
                                            </div>
                                            <div class="col-sm-6 col-xs-12">
                                                <label id="bold-label">${localStorage.getItem('gender')}</label>
                                            </div>
                                        </div>
                                        <div class="row mb-3">
                                            <div class="col-sm-6 col-xs-12">
                                                <label>${localize.msg('lit-html-example:phone')} : </label>
                                            </div>
                                            <div class="col-sm-6 col-xs-12">
                                                <label id="bold-label">${localStorage.getItem('phone')}</label>
                                            </div>
                                        </div>
                                        <div class="row mb-4">
                                            <div class="col-sm-6 col-xs-12">
                                                <label>${localize.msg('lit-html-example:email')} : </label>
                                            </div>
                                            <div class="col-sm-6 col-xs-12">
                                                <label id="bold-label">${localStorage.getItem('email')}</label>
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

customElements.define('details-component', DetailsComponent);