describe("Cakes test", () => {
    beforeEach(() => {

        cy.loginAsAdmin();
        
        
    });

    it("Perform Crud Operations", () => {
        cy.visit("/admin/dashboard/templates");
        cy.getDataTest("templates-header").should("be.visible");

        cy.getDataTest("add-new-template-button").click();

        const templateName =  `Elegant Celebration Cypress ${Date.now()}`;
        cy.getDataTest("add-new-template-designName").type(templateName);
        cy.getDataTest("add-new-template-description").type("An elegant cake design perfect for celebrations.");
        cy.getDataTest("add-new-template-sizeOptions").type("Small, Medium, Large");
        cy.getDataTest("add-new-template-basePrice").clear().type(3000);
        cy.getDataTest("add-new-template-quantityAvailable").type("10");
        cy.getDataTest("add-new-template-category").type("Wedding");
        cy.getDataTest("add-new-template-baseFlavor").type("Vanilla, Red Velvet");        
        cy.getDataTest("add-new-template-imageURL").attachFile("cake.png");
        cy.getDataTest("add-new-template-submit-button").click();
        cy.contains("Design added successfully").should("be.visible");
        cy.contains(templateName).should("exist");

        // updated the created template
        cy.contains(templateName)
        .closest("[data-test='template-details']")
        .within(() => {
        cy.getDataTest("edit-template-button").click();                                        
        }); 

        const NewPrice = 3500;

    cy.get("#update_template").within(() => {
        cy.getDataTest("edit-design-name-input").should("have.value", templateName);
        cy.getDataTest("edit-base-price-input").clear().type(NewPrice);
        cy.getDataTest("update-template-button").click();});


        cy.contains(/Design updated successfully/i).should("be.visible");


        //delete the created template
        cy.contains(templateName)
        .closest("[data-test='template-details']")
        .within(() => {
            cy.getDataTest("delete-template-button").click();                       
        });

        cy.contains(templateName).closest("[data-test='delete-design-modal']").within(() => {
            cy.getDataTest("delete-design-confirm-button").click();
        });

        cy.contains(/Design deleted successfully/i).should("be.visible");
            
    });
});
