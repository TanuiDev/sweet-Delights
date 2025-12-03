describe("Login test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Login with valid credentials", () => {
    cy.contains("Welcome Back").should("be.visible");

    cy.getDataTest("login-email").as("loginEmail-input");

    cy.get("@loginEmail-input").should("be.visible")
    .should("have.attr", "type", "email")
    .type("briantanui371@gmail.com");

    cy.getDataTest("login-password").as("loginPassword-input");

     cy.get("@loginPassword-input").should("be.visible")
    .should("have.attr", "type", "password")
    .type("123456789");

    cy.getDataTest("login-submit").as("loginSubmit-button");

    cy.get("@loginSubmit-button")
    .should('contain', 'Sign In')
    .should("not.be.disabled")        
    .click();

    cy.contains(/User logged in successfully/i).should("be.visible");

    cy.url().should('include', '/admin/dashboard/orders');
    



  });

  it("Fail to login with invalid credentials", () => {
  });

});