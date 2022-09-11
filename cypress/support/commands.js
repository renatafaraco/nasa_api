// ***********************************************
// This example commands.js shows you how to
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

Cypress.Commands.add(
  'sendRequest',
  (requestMethod, apiKey, path, parameters) => {
    let options = {
      url: Cypress.config('baseUrl') + path + parameters + '&api_key=' + apiKey,
      method: requestMethod,
      failOnStatusCode: false,
    };
    return cy.request(options);
  }
);

Cypress.Commands.add(
  'getElementByKey',
  { prevSubject: true },
  (elementList, key, value) => {
    let result = Array.isArray(elementList)
      ? elementList.find((element) => element[key] === value)
      : {};
    return result;
  }
);
