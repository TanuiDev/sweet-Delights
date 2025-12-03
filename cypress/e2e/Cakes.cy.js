describe("Cakes test", () => {
    beforeEach(() => {

        cy.loginAsAdmin();
        
        
    });

    it("Perform Crud Operations", () => {
        cy.visit("/admin/dashboard/ready");
        cy.getDataTest("ready-made-cakes-header").should("be.visible"); 
        cy.getDataTest("add-new-cake-button").click();
             
    });
});
