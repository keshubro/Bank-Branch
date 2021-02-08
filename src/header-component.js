import { LitElement, html, css } from 'lit-element';
import '@lion/button/lion-button.js';
import { localize,LocalizeMixin } from '@lion/localize';


export class HeaderComponent extends LocalizeMixin(LitElement)  {

    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
    }

    static get styles() {
        return css`
        .header-cnt{
          padding:5px;
          text-align: center;
          color:white;
          background-color: brown;
        }

        #heading{
          letter-spacing: 2px;
          font-size:20px;
          font-weight: 700;
        }

        .btn-container{
          font-size:0px;
        }
        lion-button{
            margin: 0px;
            font-size: 14px;
            height:30px;
            border: 1px solid #fff; 
            background-color: transparent; 
        }

        #btnEl {
          background: green;
        }

        `;
      }
    
  
  constructor() {
    super();
    this.buttonEL={};
    this.buttonNL={};
  }

  render() {
    return html`
    <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
    <div class="container-fluid">
      <div class="row">
        <div class="col-10 header-cnt" id="heading">
        ${localize.msg('lit-html-example:heading')}
        </div>
        <div class="col align-middle header-cnt">
          <div class="btn-container">
            <lion-button @click=${this.changeLangToEL} id="btnEl">EN</lion-button>
            <lion-button @click=${this.changeLangToNL} id="btnNL">NL</lion-button>
          </div>
        </div>
      </div>
    </div>
    `;
  }

  updated(){
    this.buttonEL=this.shadowRoot.querySelector("#btnEl");
    this.buttonNL=this.shadowRoot.querySelector("#btnNL");
  }

  changeLangToEL(){
    localize.locale = 'en-GB';
    this.buttonEL.style.background = 'green';
    this.buttonNL.style.background = 'transparent';
  }

  changeLangToNL(){
    localize.locale = 'nl-NL';
    this.buttonEL.style.background = 'transparent';
    this.buttonNL.style.background = 'green';
  }
}

window.customElements.define('header-component', HeaderComponent);