describe("Direccion Web", () => {
    it("passes", () => {
      cy.visit("http://localhost:5173/");
      cy.viewport(1280, 800);
      cy.get('input[name="correo"]').type("Kevin@gmail.com");
      cy.get('input[name="contraseña"]').type("Kevin@123");
      cy.get('button[type="submit"]').click();
  
      cy.get("[name=mostrar-usuarios]").click();
  
      cy.get('input[name="barra"]').type("Moises");
   
      cy.get('#users').should('include.text', 'Moises').should('be.visible');
  
    });
  });
  