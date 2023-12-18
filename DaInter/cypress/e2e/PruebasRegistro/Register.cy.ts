describe("Pruebas de Registro", () => {
  it("Rellena el formulario de registro y verifica el guardado exitoso", () => {
    cy.visit("http://localhost:5173/register");
    cy.viewport(1280, 800);
     
    cy.get('input[name="nombre"]').type("Nombre Usuario");

    cy.get('select[name="select-rol"]').select('Administrador');
   
    cy.get('input[name="correo"]').type("usuario@example.com");
    cy.get('input[name="contraseña"]').type("Usuario@123");
    cy.get('input[name="Repita la contraseña"]').type("Usuario@123");

    cy.get('button[type="submit"]').click();

    cy.get('.Toastify__toast--success').should('be.visible');
  });
});
