describe("Direccion Web", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1280, 800);
    cy.get('input[name="correo"]').type("Kevin@gmail.com");
    cy.get('input[name="contraseña"]').type("Kevin@123");
    cy.get('button[type="submit"]').click();

    cy.get("[name=mostrar-lista]").click();

    cy.get("[name=edit]").click();

    cy.get('#list:contains("Juan") [name=openModalEdit]').click();

    /* cy.get('input[name="nombre"]').clear().type("Juan");
    cy.get('input[name="apellidoPaterno"]').clear().type("Sanchez");
    cy.get('input[name="apellidoMaterno"]').clear().type("Salgado");
    cy.get('input[name="correo"]').clear().type("Juan@gmail.com"); */
    cy.get('input[name="escuela"]').clear().type("UNID");
    cy.get('button[type="submit"]').click();
    cy.get(".Toastify__toast--success").should("be.visible");
  });
});
