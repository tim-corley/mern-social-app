describe("Login Tests", () => {
  it("Login Button Directs to Login Page", () => {
    cy.visit("/");
    cy.contains("Login").click();
    cy.url().should("include", "/login");
    cy.get(".form > h1").should("have.text", "Login");
  });
  it("Invalid Credentials Prompts Error", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type("Not User");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[id="login-btn"]').click();
    cy.get('[id="error-block"]').should("be.visible");
    cy.get('[id="error-block"]').should("have.text", "User not found");
  });
  it("Blank Password Field Promts Error", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type("Not User");
    cy.get('button[id="login-btn"]').click();
    cy.get('[id="error-block"]').should("be.visible");
    cy.get('[id="error-block"]').should(
      "have.text",
      "password cannot be blank"
    );
  });
  it("Blank Username Field Promts Error", () => {
    cy.visit("/login");
    cy.get('input[name="password"]').type("wrongpassword");
    cy.get('button[id="login-btn"]').click();
    cy.get('[id="error-block"]').should("be.visible");
    cy.get('[id="error-block"]').should(
      "have.text",
      "username cannot be blank"
    );
  });
  it("Login Works with Valid Credentials", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type(Cypress.env("VALID_USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("VALID_PASSWORD"));
    cy.get('button[id="login-btn"]').click();
    cy.get('[id="logout-btn"]').should("be.visible");
    cy.get(".page-title").should("have.text", "Recent Posts");
    cy.get(".form > h2").should("have.text", "Create New Post");
    cy.get('[id="username"]').should("have.text", "Demo User");
  });
  it("User Can Logout", () => {
    cy.visit("/login");
    cy.get('input[name="username"]').type(Cypress.env("VALID_USERNAME"));
    cy.get('input[name="password"]').type(Cypress.env("VALID_PASSWORD"));
    cy.get('button[id="login-btn"]').click();
    cy.get('[id="username"]').should("have.text", "Demo User");
    cy.get('[id="logout-btn"]').click();
    cy.get('[id="home-btn"]').should("be.visible");
  });
});
