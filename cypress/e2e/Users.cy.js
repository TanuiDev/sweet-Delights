describe("Users Tests",()=>{
    beforeEach(() => {
         cy.loginAsAdmin();
    });

    it("Should validate the presence of users",()=>{
        cy.visit("/admin/dashboard/users");
         cy.getDataTest("users-title").should("be.visible");
         cy.getDataTest("users-list").should("exist");
         
         
    })
}
)