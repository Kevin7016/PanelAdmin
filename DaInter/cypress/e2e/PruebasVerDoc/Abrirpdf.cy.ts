describe("Direccion Web", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1280, 800);
    cy.get('input[name="correo"]').type("Kevin@gmail.com");
    cy.get('input[name="contraseña"]').type("Kevin@123");

    cy.get('button[type="submit"]').click();
    cy.get('[name=mostrar-lista]').click();
    cy.contains('p#dainter', 'PruebaDoc').closest('[id="toggleUser"]').click();
    cy.get('[name=buttonToggle]').click();
    
    cy.get('[name=actaNacimiento]').click();
   /*  cy.get('[name=ine]').click();
    cy.get('[name=comprobanteDomicilio]').click();
    cy.get('[name=curp]').click();
    cy.get('[name=cv]').click();
    cy.get('[name=hr]').click(); */
  });
});
