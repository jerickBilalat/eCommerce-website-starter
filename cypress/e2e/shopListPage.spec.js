/* eslint-disable no-undef */
// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />

describe('typical user path for shopping list feature', () => {
  it('navigate from home with no items in the list', () => {
    cy.visit('/');

    cy.get('.menu')
      .findByText(/Shop/)
      .click();

    cy.findByText(/view list/i)
      .should('exist')
      .click();

    cy.get('#titlebar h2').findByText(/shopping list/i);

    // find both in small and large view
    cy.findAllByText(/no items in shoplist/i).should('exist');
    cy.findAllByText(/here/i).should('exist');
  });

  it('can go back to shop page when there is no in list, viewing large screen', () => {
    cy.visit('/shop_list');

    cy.get('.large-only').within(() => {
      cy.findByText(/here/i).click();
    });

    cy.get('#titlebar h2').findByText(/Shop/);
    cy.findByText(/no list items/i).should('exist');
  });
});
