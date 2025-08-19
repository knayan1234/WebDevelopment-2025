describe("Auth: Login and Dashboard Access", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("/login");
  });

  it("logs in and reaches dashboard", () => {
    cy.get('[data-testid="login-form"]')
      .within(() => {
        cy.get('[data-testid="email-input"]').type("user@example.com");
        cy.get('[data-testid="password-input"]').type("correctpassword");
      })
      .submit(); // <-- key change

    cy.location("pathname", { timeout: 10_000 }).should("eq", "/dashboard");
    cy.contains('[data-testid="dashboard-greeting"]', "Welcome");
  });
  it("logs in successfully and accesses dashboard", () => {
    cy.get('[data-testid="login-form"]')
      .within(() => {
        cy.get('[data-testid="email-input"]').type("user@example.com");
        cy.get('[data-testid="password-input"]').type("correctpassword", {
          log: false,
        });
      })
      .submit();

    cy.location("pathname", { timeout: 10000 }).should("eq", "/dashboard");

    // Wait for greeting element to appear and be visible
    cy.get('[data-testid="dashboard-greeting"]', { timeout: 6000 })
      .should("be.visible")
      .and("contain.text", "Welcome"); // Matches partial text
  });
});
