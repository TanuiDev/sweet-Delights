/// <reference types="cypress" />

Cypress.Commands.add('getDataTest',(dataTestSelector)=> {
   return cy.get(`[data-test=${dataTestSelector}]`);
})

Cypress.Commands.add('loginAsAdmin', (email='briantanui371@gmail.com', password='123456789') => {
  cy.visit('/login');
  cy.visit('/login')
    cy.getDataTest('login-email').type(email)
    cy.getDataTest('login-password').type(password)
    cy.getDataTest('login-submit').click()

    cy.contains(/Success/i).should('be.visible')
});

export {};
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>;
        loginAsAdmin(email: string, password: string): Chainable<void>;
    }
  }
}