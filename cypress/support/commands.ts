/// <reference types="cypress" />

Cypress.Commands.add('getDataTest',(dataTestSelector)=> {
   return cy.get(`[data-test=${dataTestSelector}]`);
})

export {};
declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      getDataTest(dataTestSelector: string): Chainable<JQuery<HTMLElement>>;
    }
  }
}