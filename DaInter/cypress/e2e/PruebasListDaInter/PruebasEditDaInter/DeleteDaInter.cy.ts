describe("Direccion Web", () => {
  it("passes", () => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1280, 800);
    cy.get('input[name="correo"]').type("Kevin@gmail.com");
    cy.get('input[name="contraseña"]').type("Kevin@123");
    cy.get('button[type="submit"]').click();

    cy.get("[name=mostrar-lista]").click();

    cy.get("[name=edit]").click();

    cy.get('#list:contains("Juan") [name=delete]').click();

    cy.get("[name=cancelmodal]").click();

  });
});
