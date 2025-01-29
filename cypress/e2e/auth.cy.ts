export const login = (username: string, password: string) => {
  // https://docs.cypress.io/api/commands/session#Cross-domain-sessions
  cy.visit("https://iam-dev.cloud.cnaf.infn.it/login"); // do not remove it

  cy.session(
    username,
    () => {
      cy.visit("/signin").then(() => {
        cy.get("#username").type(username);
        cy.get("#password").type(password, {
          log: false,
        });
        cy.get("#login-submit").click();
      });
    },
    {
      validate() {
        cy.url().should("match", /.+\/users\/me$/);
      },
    }
  );
};
