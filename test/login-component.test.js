 import { html, fixture, expect, elementUpdated } from '@open-wc/testing';

 import '../src/LoginComponent.js';

  describe('login-component', () => {
    let el;

    beforeEach(async () => {
      el = await fixture(html`
       <login-component></login-component>
     `);
    });

    it('renders a h2', async () => {
      const h2 = await el.shadowRoot.querySelector('h2');
      expect(h2).to.exist;
    });

    it('renders a username', async () =>{
      const username = await el.shadowRoot.querySelector('lion-input[id="username"]');
      expect(username).to.exist;
    })
  });