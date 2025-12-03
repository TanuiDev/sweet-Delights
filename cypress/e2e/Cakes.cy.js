describe("Cakes test", () => {
    beforeEach(() => {

        cy.loginAsAdmin();
        
        
    });

    it("Perform Crud Operations", () => {
        cy.visit("/admin/dashboard/ready");
        cy.getDataTest("ready-made-cakes-header").should("be.visible"); 
        cy.getDataTest("add-new-cake-button").click();

        const cakeName =  `Chocolate Delight Cypress ${Date.now()}`;
        
        cy.getDataTest("add-new-cake-cakeName").type(cakeName);
        cy.getDataTest("add-new-cake-flavorsUsed").type("Chocolate, Vanilla");
        cy.getDataTest("add-new-cake-size").type("Medium");
        cy.getDataTest("add-new-cake-quantityAvailable").clear().type("15");
       cy.getDataTest("add-new-cake-imageURL").attachFile("cake.png");
        cy.getDataTest("add-new-cake-submit-button").click();
        cy.contains("Cake added successfully").should("be.visible");

        cy.contains(cakeName).should("exist");




        
        
    });
});
