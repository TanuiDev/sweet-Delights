describe("Orders Tests",()=>{
    beforeEach(() => {
         cy.loginAsAdmin();
    });

    it("Should validate the presence of orders",()=>{
        cy.visit("/admin/dashboard/orders");
        cy.getDataTest("orders-title").should("be.visible");


        cy.get("[data-test='order-card']")
        .first()
        .find("[data-test='update-status-btn']")
        .click();
        cy.get("[data-test='order-status-select']").should("be.visible");    
    
    })
});