describe("My Orders Tests",()=>{
    beforeEach(() => {
         cy.loginAsCustomer();
    });

    it("Should validate the presence of my orders",()=>{
        cy.visit("/customer/dashboard/myorders");
        cy.getDataTest("my-orders-title").should("be.visible");
    });
});