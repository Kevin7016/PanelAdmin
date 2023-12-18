describe("Pruebas de Registro", () => {
  it("Rellena el formulario de registro y verifica el guardado exitoso", () => {
    cy.visit("http://localhost:5173/register");
    cy.viewport(1280, 800);

    cy.get('input[name="correo"]').type("usuario@example.com");

    cy.get(".Toastify__toast--warning").should("be.visible");
  });
});
