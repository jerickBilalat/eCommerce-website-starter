/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
// eslint-disable-next-line spaced-comment
/// <reference types="Cypress" />
import { products } from '../../src/common/api/fakeData';

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
  it('can go back to shop page when there is no in list, viewing small screen', () => {
    cy.visit('/shop_list');
    cy.viewport('iphone-5');

    cy.get('.small-only').within(() => {
      cy.findByText(/here/i).click();
    });

    cy.get('#titlebar h2').findByText(/Shop/);
    cy.findByText(/no list items/i).should('exist');

    cy.viewport('macbook-13');
  });
  it('adds item to the list', () => {
    cy.visit('/shop');
    cy.get('.row.extra-gutter-right > :nth-child(1)').within(() => {
      cy.get('.button').click();
    });

    cy.findByText(/item added to list/i).should('exist');

    cy.get('.row.extra-gutter-right > :nth-child(2)').within(() => {
      cy.get('.button').click();
    });

    cy.get(':nth-child(4) > .col-md-3 > :nth-child(2)').within(() => {
      cy.findByText(new RegExp(`${products[0].name}`, 'i')).should('exist');
      cy.findByText(new RegExp(`${products[1].name}`, 'i')).should('exist');
      cy.findByText(/view list/i).click();
    });

    cy.get('#titlebar h2')
      .findAllByText(/shopping list/i)
      .should('exist');

    cy.get('.large-only').within(() => {
      cy.findAllByText(new RegExp(`${products[0].name}`, 'i')).should('exist');
      cy.findAllByText(new RegExp(`${products[1].name}`, 'i')).should('exist');
    });
    cy.get('.small-only').within(() => {
      cy.findAllByText(new RegExp(`${products[0].name}`, 'i')).should('exist');
      cy.findAllByText(new RegExp(`${products[1].name}`, 'i')).should('exist');
    });
  });
  function addItems(qty) {
    cy.visit('/shop');
    for (let i = 0; i < qty; i++) {
      cy.get(`.row.extra-gutter-right > :nth-child(${i + 1})`).within(() => {
        cy.get('.button').click();
      });
    }
  }
  it('delete item on the shopping list', () => {
    addItems(2);

    cy.visit('/shop_list');

    cy.get('.large-only').within(() => {
      cy.get(':nth-child(1) > :nth-child(6) > .cart-remove').click();
    });

    cy.findByText(/item removed from shoplist/i).should('exist');
    cy.findAllByText(new RegExp(`${products[0].name}`, 'i')).should('not.exist');

    cy.visit('/shop');

    cy.get(':nth-child(2) > #cart').within(() => {
      cy.get('.cart-item-amount button').click();
      cy.findAllByText(new RegExp(`${products[1].name}`, 'i')).should('not.exist');
    });
    cy.findByText(/item removed from shoplist/i).should('exist');
  });
});
