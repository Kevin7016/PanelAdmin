describe("Direccion Web", () => {
    it("passes", () => {
      cy.visit("http://localhost:5173/");
      cy.viewport(1280, 800);
      cy.get('input[name="correo"]').type("Kevin@gmail.com");
      cy.get('input[name="contraseña"]').type("Kevin@123");
      cy.get('button[type="submit"]').click();
  
  
      cy.get("[name=mostrar-usuarios]").click();
  
      cy.get('#listuser:contains("Moises") [name=edituser]').click();

      cy.get('input[name="nombre"]').clear().type("Moises");
      cy.get('input[name="correo"]').clear().type("Moises@gmail.com");
      cy.get('input[name="contraseña"]').clear().type("Moises@123");
      cy.get('select[name="select-modaluser"]').select('Administrador');
      cy.get('button[type="submit"]').click();

      cy.get('.Toastify__toast--success').should('be.visible');
    });
  });
  