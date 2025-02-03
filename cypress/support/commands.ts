/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
export {};
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      loginWithIam(username: string, password: string): void;
    }
  }
}

Cypress.Commands.add("loginWithIam", (username: string, password: string) => {
  // https://docs.cypress.io/api/commands/session#Cross-domain-sessions
  cy.visit("http://localhost:3000"); // do not remove it
  cy.session(
    username,
    () => {
      cy.visit("http://localhost:3000/signin");
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
      cy.visit("http://localhost:3000");
    },
    {
      validate() {
        cy.url().should("match", /.+\/users\/me$/);
      },
    }
  );
});

// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
