describe('Direccion Web', () => {
  it('passes', () => {
    cy.visit('http://localhost:5173/')
    cy.viewport(1280, 800)
  })
})