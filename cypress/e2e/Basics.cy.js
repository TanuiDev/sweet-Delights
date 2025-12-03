

describe('Fundamentals Tests', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('Visit various elements', () => {       
        cy.visit('/')
        cy.location('pathname').should('eq', '/')
        cy.getDataTest('hero-title').contains(/Welcome to/i);
        cy.getDataTest('hero-title').contains(/Sweet Delights/i);

        cy.visit('/about')
        cy.location('pathname').should('eq', '/about')
        cy.getDataTest('about-title').contains(/About SweetDelights/i);

        cy.visit('/login')
        cy.location('pathname').should('eq', '/login')
        cy.getDataTest('login-heading').contains(/Sign in to your account to continue/i);

        cy.visit('/register')
        cy.location('pathname').should('eq', '/register')
        cy.getDataTest('register-heading').contains(/Create Your Account/i);

        cy.visit('/contact')
        cy.location('pathname').should('eq', '/contact')
        
    })


    


})