import { LitElement, html, css } from "lit-element";
import "@lion/button/lion-button.js";
import { localize, LocalizeMixin } from "@lion/localize";
import "@lion/dialog/lion-dialog.js";
import "@lion/icon/lion-icon.js";
import tag from "./images/power-off-solid.js";
import homeIcon from "./images/home-solid.js";
import "./LogoutDialogComponent";
// import '../node_modules/@fortawesome/fontawesome-free/js/all.js';
// import '../node_modules/@fortawesome/fontawesome-free/css/all.css';

export class HeaderComponent extends LocalizeMixin(LitElement) {
    static get localizeNamespaces() {
        return [
            {
                "lit-html-example": (locale) =>
                    import(`../translations/${locale}.js`),
            },
            ...super.localizeNamespaces,
        ];
    }

    static get styles() {
        return css`
            .cf {
                background-color: #ff6200;
            }
            .header-cnt,
            .home-link,
            .logout-part {
                padding: 5px;
                text-align: center;
                color: white;
                background-color: #ff6200;
            }

            .home-link > a,
            #logout-link {
                text-decoration: none;
                color: white;
            }

            #logout-link {
                border: none;
                padding: 0;
                margin: 0;
            }

            .home-link {
                display: flex;
                justify-content: center;
                align-items: center;
                padding-left: 15px;
            }

            .home-link-a,
            #logout-link,
            #loggedin-user {
                display: none;
            }

            #heading {
                letter-spacing: 2px;
                font-size: 20px;
                font-weight: 700;
            }

            .btn-container {
                font-size: 0px;
            }
            lion-button {
                margin: 0px;
                font-size: 14px;
                height: 30px;
                border: 1px solid #fff;
                background-color: transparent;
            }

            #btnEl {
                background: green;
            }

            #logoutIcon {
                font-size: 26px;
            }

            #homeIcon {
                font-size: 26px;
            }

            strong {
                color: black;
            }

            @media only screen and (max-width: 576px) {
                #logoutIcon {
                    font-size: 12px;
                    margin-top: 5px;
                }

                #loggedin-user {
                    font-size: 12px;
                }

                .logout-div {
                    width: 14px;
                    padding: 0;
                }
            }
        `;
    }

    constructor() {
        super();
        this.buttonEL = {};
        this.buttonNL = {};
    }

    logoutUser() {
        window.location.href = "/";
    }

    render() {
        return html`
    <link  rel="stylesheet" type="text/css" href="./node_modules/bootstrap/dist/css/bootstrap.min.css">
    
    <div class="container-fluid h-100 cf">
      <div class="row h-100">
        <div class="col-2 home-link d-flex justify-content-start home-div">
            <a href="/landingpage" class="home-link-a"><lion-icon aria-label="Pointing left" .svg="${homeIcon}" id="homeIcon"></lion-icon></a>
            
        </div>
        <div class="col-6 header-cnt d-flex align-items-center justify-content-center" id="heading">
        ${localize.msg("lit-html-example:heading")}
        </div>
        <div class="col col-sm-3 logout-part d-flex justify-content-center align-items-center">
            <div class="row d-flex justify-content-center align-items-center">
                <div class="col-9">
                    <strong id="loggedin-user" style="color: white;"></strong>
                </div>
                <div class="col-3 logout-div">
                    <lion-dialog .config=${{
                        hidesOnOutsideClick: true,
                        hidesOnEsc: true,
                    }}>
                        <lion-button id="logout-link" slot="invoker"><lion-icon aria-label="Pointing left" .svg="${tag}" id="logoutIcon"  @click=${
            this.logoutClicked
        }></lion-button>   
                        <logout-dialog-content slot="content" @logout-event=${
                            this.logoutUser
                        }></logout-dialog-content >
                    </lion-dialog>
                    <lion-button id="logout-link" slot="invoker"><lion-icon aria-label="Pointing left" .svg="${tag}" id="logoutIcon"  @click=${
            this.logoutClicked
        }></lion-button>   
                </div>
            </div>
        </div>
        <div class="col col-sm-1 align-middle header-cnt">
          <div class="btn-container">
            <lion-button @click=${
                this.changeLangToEL
            } id="btnEl">EN</lion-button>
            <lion-button @click=${
                this.changeLangToNL
            } id="btnNL">NL</lion-button>
          </div>
        </div>
      </div>
    </div>
    `;
    }

    routeChanged(e) {
        console.log("route changed");
        // debugger;
        if (window.location.pathname !== "/") {
            if (!sessionStorage.getItem("username")) {
                window.location.href = "/";
            }
        }

        if (window.location.pathname == "/") {
            sessionStorage.removeItem("username");
            sessionStorage.removeItem("accno");
            this.shadowRoot.querySelector(".home-link-a").style.display =
                "none";
            this.shadowRoot.querySelector("#logout-link").style.display =
                "none";
            this.shadowRoot.querySelector("#loggedin-user").style.display =
                "none";
        }
        // if(window.location.pathname == '/search')
        // {
        //     this.shadowRoot.querySelector('.home-link-a').style.display = "none";
        // }
        else {
            this.shadowRoot.querySelector(".home-link-a").style.display =
                "block";
            this.shadowRoot.querySelector("#logout-link").style.display =
                "block";
            this.shadowRoot.querySelector(
                "#loggedin-user"
            ).innerHTML = `Hi, ${sessionStorage.getItem("username")}`;
            this.shadowRoot.querySelector("#loggedin-user").style.display =
                "block";
        }
    }

    updated() {
        // debugger;
        this.buttonEL = this.shadowRoot.querySelector("#btnEl");
        this.buttonNL = this.shadowRoot.querySelector("#btnNL");

        // this.shadowRoot.getElementById('logout-link').onclick = function(e){
        //     window.location.href = '/';
        // }
    }

    firstUpdated() {
        super.firstUpdated();
        // debugger;
        window.addEventListener("popstate", this.routeChanged.bind(this));
    }

    logoutClicked(e) {
        // debugger;
    }

    changeLangToEL() {
        localize.locale = "en-GB";
        this.buttonEL.style.background = "green";
        this.buttonNL.style.background = "transparent";
    }

    changeLangToNL() {
        localize.locale = "nl-NL";
        this.buttonEL.style.background = "transparent";
        this.buttonNL.style.background = "green";
    }
}

window.customElements.define("header-component", HeaderComponent);
