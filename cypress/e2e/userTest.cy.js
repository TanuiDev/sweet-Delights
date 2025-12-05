describe("My Orders Tests",()=>{
    beforeEach(() => {
         cy.loginAsCustomer();
    });

    it("Should validate the presence of my orders",()=>{
        cy.visit("/customer/dashboard/myorders");
        cy.getDataTest("my-orders-title").should("be.visible");
        cy.get("[data-test='order-card']")
        .first()
    });

    it("Should Test the availability of  Cakes",()=>{ 
        cy.visit("/customer/dashboard/cakes");  
        cy.getDataTest("cakes-title").should("be.visible");

        cy.get("[data-test='cake-card']")
        .first().should("be.visible");


        //place new order button    

        cy.getDataTest("place-new-order-btn")
        .should("be.visible")
        .click();       

        cy.get("[data-test='create-order-dialog']")
        .should("be.visible");

        
 
        
        
        

        
            
    });

        
        
    })

