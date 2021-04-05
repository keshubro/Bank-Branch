import { LitElement, html, css } from "lit-element";
import '@vaadin/vaadin-grid';

export class QueriesComponent extends LitElement {

    constructor() {
        super();

    }


    static get styles() {
        return css`
            #grid {
                width: 500px;
            }
        `;
    }

    firstUpdated() {
        super.firstUpdated();

        let users = [
            {
                "name": {
                    "first": "Keshav",
                    "last": "Sharma"
                },
                "location": {
                    "city": "Mumbai"
                }
            },
            {
                "name": {
                    "first": "Madhav",
                    "last": "Agrawal"
                },
                "location": {
                    "city": "Delhi"
                }
            }
        ];

        this.shadowRoot.querySelector('vaadin-grid').items = users;
    }

    render() {
        return html`
            
            <vaadin-grid id="grid">
                <vaadin-grid-column path="name.first" header="First name"></vaadin-grid-column>
                <vaadin-grid-column path="name.last" header="Last name"></vaadin-grid-column>
                <vaadin-grid-column path="location.city"></vaadin-grid-column>
            </vaadin-grid>
        `;
    }
}

customElements.define('queries-component', QueriesComponent);