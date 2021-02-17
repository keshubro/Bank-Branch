import { LitElement, html, css } from 'lit-element';
import '@lion/button/lion-button.js';
import { localize,LocalizeMixin } from '@lion/localize';
// import '../node_modules/@fortawesome/fontawesome-free/js/all.js';
// import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

export class HeaderComponent extends LocalizeMixin(LitElement)  {

    static get localizeNamespaces() {
        return [
          { 'lit-html-example': locale => import(`../translations/${locale}.js`) },
          ...super.localizeNamespaces,
        ];
    }

    static get styles() {
        return css`
        .header-cnt, .home-link, .logout-part{
          padding:5px;
          text-align: center;
          color:white;
          background-color: brown;
        }

        .home-link > a, #logout-link{
            text-decoration: none;
            color: white;
        }

        #logout-link{
            border: none;
            padding-top: 0;
        }

        .home-link{
            display: flex;
            justify-content: center;
            align-items: center;
            padding-left: 15px;
        }

        .home-link-a, #logout-link, #loggedin-user{
            display: none;
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
        <div class="col-3 home-link d-flex justify-content-start">
            <a href="/search" class="home-link-a">Home</a>
            <i class="fas fa-camera"></i>
        </div>
        <div class="col-6 header-cnt d-flex align-items-center justify-content-center" id="heading">
        ${localize.msg('lit-html-example:heading')}
        </div>
        <div class="col logout-part">
            <strong id="loggedin-user"></strong>
            <lion-button id="logout-link">Logout</lion-button>   
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

  routeChanged(e)
    {
        console.log('route changed');
        // debugger;
        if(window.location.pathname == '/')
        {
            sessionStorage.removeItem('username');
            this.shadowRoot.querySelector('.home-link-a').style.display = "none";
            this.shadowRoot.querySelector('#logout-link').style.display = "none";
            this.shadowRoot.querySelector('#loggedin-user').style.display = "none";
        }
        // if(window.location.pathname == '/search')
        // {
        //     this.shadowRoot.querySelector('.home-link-a').style.display = "none";
        // }
        else
        {

            
            this.shadowRoot.querySelector('.home-link-a').style.display = "block";
            this.shadowRoot.querySelector('#logout-link').style.display = "block";
            this.shadowRoot.querySelector('#loggedin-user').innerHTML = `Hi, ${sessionStorage.getItem('username')}`;
            this.shadowRoot.querySelector('#loggedin-user').style.display = "block";
        }
    }

    updated(){
        // debugger;
        this.buttonEL=this.shadowRoot.querySelector("#btnEl");
        this.buttonNL=this.shadowRoot.querySelector("#btnNL");

        this.shadowRoot.getElementById('logout-link').onclick = function(e){
            window.location.href = '/';
        }
    } 

    firstUpdated()
    {
        super.firstUpdated();
        // debugger;
        window.addEventListener('load', this.routeChanged.bind(this));
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