export const login = (username: string, password: string) => {
  // https://docs.cypress.io/api/commands/session#Cross-domain-sessions
  cy.visit("http://localhost:8080"); // do not remove it

  cy.session(
    username,
    () => {
      cy.visit("/signin");
      cy.origin(
        "https://iam-dev.cloud.cnaf.infn.it",
        { args: { username, password } },
        ({ username, password }) => {
          cy.get("#username").type(username);
          cy.get("#password").type(password, {
            log: false,
          });
          cy.get("#login-submit").click();
        }
      );
      cy.visit("http://localhost:8080");
    },
    {
      validate() {
        cy.url().should("match", /.+\/users\/me$/);
      },
    }
  );
};
