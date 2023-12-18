import "cypress-file-upload";

describe("Direccion Web", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1280, 800);
    cy.get('input[name="correo"]').type("Kevin@gmail.com");
    cy.get('input[name="contraseña"]').type("Kevin@123");
    cy.get('button[type="submit"]').click();

    cy.get("[name=mostrar-lista]").click();

    cy.get("[name=edit]").click();

    cy.get('#list:contains("Juan") [name=openModalpdf]').click();

    /* cy.get('input[name="cv"]').attachFile('Files/CV_Kevin-Molina.pdf');
      cy.get('input[name="actaNacimiento"]').attachFile('Files/Acta_Nacimiento_Kevin-Molina.pdf');
      cy.get('input[name="hr"]').attachFile('Files/ITESCAM - Carga Académica.pdf');
      cy.get('input[name="ine"]').attachFile('Files/INE_Kevin-Molina.pdf'); */
    cy.get('input[name="comprobanteDomicilio"]').attachFile(
      "Files/Comprobante_Domicilio-Kevin-Molina.pdf"
    );
    /*  cy.get('input[name="curp"]').attachFile('Files/CURP_Kevin-Molina.pdf'); */
    cy.get('button[type="submit"]').click();
    cy.get(".Toastify__toast--success").should("be.visible");
  });
});
