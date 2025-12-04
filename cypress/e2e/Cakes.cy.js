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

        cy.contains(templateName)
        .closest("[data-test='template-details']")
        .within(() => {
        cy.getDataTest("edit-template-button").click();                                        
        }); 
    cy.get("#updatecake").within(() => {
        cy.getDataTest("edit-design-name-input").should("have.value", cakeName);
        cy.getDataTest("edit-base-price-input").clear().type(NewPrice);
        cy.getDataTest("update-template-button").click();
    });
        
        
        // cy.contains(cakeName)
        // .closest("[data-test='cake-details']")
        // .within(() => {
        //     cy.getDataTest("delete-cake-button").click();                       
        // });

        
            
    });

        
   
});
