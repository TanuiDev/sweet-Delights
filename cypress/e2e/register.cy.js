describe("Register test", () => {
    beforeEach(() => {
        cy.visit("/register");
    });

    it("Register with valid details", () => {
        cy.contains(/Create Your Account/i).should("be.visible");    
        cy.getDataTest("register-heading").should("be.visible");

        cy.intercept('POST', '/users/register',{
            statusCode: 201,
            body: {message: "User created successfully. Verification code sent to bk.kibiwott@gmail.com."
            }

        }) .as('registerUser');

        cy.getDataTest("register-name").as("name-input");
        cy.get("@name-input")
            .should("be.visible")
            .should("have.attr", "type", "text")
            .type("Test User");
        
        cy.getDataTest("register-email").as("email-input");
        cy.get("@email-input")
            .should("be.visible")
            .should("have.attr", "type", "email")
            .type("bk.kibiwott@gmail.com");
        cy.getDataTest("register-password").as("password-input");
        cy.get("@password-input")
            .should("be.visible")
            .should("have.attr", "type", "password")
            .type("Test@1234");
        cy.getDataTest("register-confirm-password").as("confirmPassword-input");
        cy.get("@confirmPassword-input")
            .should("be.visible")
            .should("have.attr", "type", "password")
            .type("Test@1234");
        cy.getDataTest("register-address").as("address-input");
        cy.get("@address-input")
            .should("be.visible")
            .should("have.attr", "type", "text")
            .type("123 Test St, Test City");
        cy.getDataTest("register-phone").as("phone-input");
        cy.get("@phone-input")
            .should("be.visible")
            .should("have.attr", "type", "text")
            .type("1234567890");
        cy.getDataTest("register-submit").as("registerSubmit-button");
        cy.get("@registerSubmit-button")
            .should('contain', 'Create Account')
            .should("not.be.disabled")        
            .click();       
        cy.contains(/User registered successfully!/i).should("be.visible");

    });
})