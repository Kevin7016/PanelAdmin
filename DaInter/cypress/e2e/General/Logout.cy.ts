describe("Prueba de login", () => {
    it("inicia sesión correctamente", () => {
      cy.visit("http://localhost:5173/");
      cy.viewport(1280, 800);
  
      cy.get('input[name="correo"]').type("Kevin@gmail.com");
      cy.get('input[name="contraseña"]').type("Kevin@123");
  
      cy.get('button[type="submit"]').click();
  
      cy.url().should("include", "/dashboard");

      cy.get("[name=logout]").click();
      cy.url().should("include", "/");
      cy.viewport(1280, 800);
    });
  
  });
  