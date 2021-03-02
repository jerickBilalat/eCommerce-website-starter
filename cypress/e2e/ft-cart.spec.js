/* eslint-disable no-undef */
import { products } from '../../src/common/api/fakeData';

describe('cart feature', () => {
  it('adds product item in the cart from the pdp', () => {
    cy.visit('/shop');
    cy.get(':nth-child(1) > .shop-item > figure > :nth-child(1) > img').click();
    cy.findByText(/add to cart/i).click();
    cy.findByText(/item added to cart/i).should('exist');
    cy.get(':nth-child(1) > #cart').within(() => {
      cy.findByText(new RegExp(`${products[0].name}`, 'i')).should('exist');
    });
    cy.get('.cart-counter')
      .within(() => {
        cy.findByText(/1/).should('exist');
      })
      .click();

    cy.get('#titlebar h2')
      .findByText(/cart/i)
      .should('exist');

    cy.get('.large-only')
      .findByText(new RegExp(`${products[0].name}`, 'i'))
      .should('exist');
    cy.get('.small-only')
      .findByText(new RegExp(`${products[0].name}`, 'i'))
      .should('exist');
  });
  it('add product item in the cart from slp', () => {
    cy.visit('/shop');
    cy.get(`.row.extra-gutter-right > :nth-child(1)`).within(() => {
      cy.get('.button').click();
    });
    cy.visit('/shop_list');
    cy.get('.large-only').within(() => {
      cy.findByText(/add to cart/i).click();
    });
    cy.findByText(/item added to cart/i);
    cy.get('.cart-counter')
      .within(() => {
        cy.findByText(/1/).should('exist');
      })
      .click();

    cy.get('#titlebar h2')
      .findByText(/cart/i)
      .should('exist');

    cy.get('.large-only')
      .findByText(new RegExp(`${products[0].name}`, 'i'))
      .should('exist');
    cy.get('.small-only')
      .findByText(new RegExp(`${products[0].name}`, 'i'))
      .should('exist');
  });
  it('deletes cart item from the card widget', () => {
    cy.visit('/shop');
    cy.get(':nth-child(1) > .shop-item > figure > :nth-child(1) > img').click();
    cy.findByText(/add to cart/i).click();
    cy.findByText(/item added to cart/i).should('exist');
    cy.get(':nth-child(1) > #cart').within(() => {
      cy.findByText(new RegExp(`${products[0].name}`, 'i')).should('exist');
      cy.get('.cart-items > li > .cart-item-amount > .item-remove').click();
      cy.findByText(new RegExp(`${products[0].name}`, 'i')).should('not.exist');
    });
    cy.findByText(/item removed from cart/i).should('exist');
    cy.get('.cart-counter')
      .within(() => {
        cy.findByText(/0/).should('exist');
      })
      .click();
    cy.findAllByText(/no items in cart/i).should('exist');
  });
  it('deletes cart item from the cart widget', () => {
    cy.visit('/shop');
    cy.get(':nth-child(1) > .shop-item > figure > :nth-child(1) > img').click();
    cy.findByText(/add to cart/i).click();
    cy.findByText(/item added to cart/i).should('exist');
    cy.get(':nth-child(1) > #cart').within(() => {
      cy.findByText(new RegExp(`${products[0].name}`, 'i')).should('exist');
      cy.get('.cart-items > li > .cart-item-amount > .item-remove').click();
      cy.findByText(new RegExp(`${products[0].name}`, 'i')).should('not.exist');
    });
    cy.findByText(/item removed from cart/i).should('exist');
    cy.get('.cart-counter')
      .within(() => {
        cy.findByText(/0/).should('exist');
      })
      .click();
    cy.findAllByText(/no items in cart/i).should('exist');
  });
  it('deletes cart item from the cart page', () => {
    cy.visit('/shop');
    cy.get(':nth-child(1) > .shop-item > figure > :nth-child(1) > img').click();
    cy.findByText(/add to cart/i).click();
    cy.visit('/cart');
    cy.get('.large-only').within(() => {
      cy.get('.cart-remove').click();
    });
    cy.findByText(/item removed from cart/i).should('exist');
  });
});
