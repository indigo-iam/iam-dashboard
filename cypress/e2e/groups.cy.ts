describe("groups", () => {
  beforeEach(() => {
    cy.loginWithIam(
      Cypress.env("IAM_ADMIN_USER"),
      Cypress.env("IAM_ADMIN_PASSWD")
    );
  });

  it("create group", () => {
    // create a new group
    cy.visit("/groups");
    cy.get("[data-test=add-group").click();
    cy.get("[data-test=modal").within(() => {
      cy.get("input[type=text]").type("test-bot-group-1");
      cy.get("button[type=submit]").click();
    });
    cy.log("group created");
    // delete group
    cy.wait(100);
    cy.get("[data-test=search-group").type("test-bot-group-1");
    cy.get("[data-test=option]").should("have.length", 1);
    cy.get("[data-test=option]").click();
    cy.get("[data-test=delete]").click();
    cy.get("[data-test=modal]").within(() => {
      cy.get("button[type='submit']").click();
    });
    cy.log("group deleted");
  });
});
