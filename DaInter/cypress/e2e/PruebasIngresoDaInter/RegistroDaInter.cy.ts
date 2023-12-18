import 'cypress-file-upload';

describe("Direccion Web", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1280, 800);
    cy.get('input[name="correo"]').type("Kevin@gmail.com");
    cy.get('input[name="contraseña"]').type("Kevin@123");

    cy.get('button[type="submit"]').click();
    cy.get('[name=agregar-estudiantes]').click();

    cy.get('input[name="nombre"]').type("Kevin@gmail.com");
    cy.get('input[name="apellidoPaterno"]').type("Kevin@gmail.com");
    cy.get('input[name="apellidoMaterno"]').type("Kevin@gmail.com");
    cy.get('input[name="email"]').type("Kevin@gmail.com");
    cy.get('input[name="escuela"]').type("Kevin@gmail.com");

    cy.get('[name=guardar]').click();
  });
});
