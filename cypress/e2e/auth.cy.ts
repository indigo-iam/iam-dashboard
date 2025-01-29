export const login = (username: string, password: string) => {
  // https://docs.cypress.io/api/commands/session#Cross-domain-sessions
  cy.visit("http://0.0.0.0:8080"); // do not remove it

  cy.session(username, () => {
      cy.visit("http://0.0.0.0:8080/signin");
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
      cy.visit("http://0.0.0.0:8080");
    },
    {
      validate() {
        cy.url().should("match", /.+\/users\/me$/);
      },
    }
  );
};
