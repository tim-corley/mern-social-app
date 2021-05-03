describe("My First Test", () => {
  it("Invalid Credentials Prompt Error", () => {
    cy.visit("http://localhost:3000/login");
    // cy.contains("Login").click();
    // cy.url().should("include", "/login");
    cy.get('input[name="username"]').type("fake@email.com");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[id="login-btn"]').click();
    cy.get("[id=error-block]").should("be.visible");
  });
});
