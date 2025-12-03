describe("Login test", () => {
  beforeEach(() => {
    cy.visit("/login");
  });

  it("Login with valid credentials", () => {
    cy.contains("Welcome Back").should("be.visible");
  });

  it("Fail to login with invalid credentials", () => {
  });

});