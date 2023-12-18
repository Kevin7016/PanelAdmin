describe("falla al iniciar sesión con credenciales incorrectas", () => {
  it("inicia sesión correctamente", () => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1280, 800);
    cy.get('input[name="correo"]').type("usuario_X");
    cy.get('input[name="contraseña"]').type("contraseña_incorrecta");

    cy.get('button[type="submit"]').click();

    cy.get(".Toastify__toast--error").should("be.visible");
    cy.viewport(1280, 800);
  });
});
