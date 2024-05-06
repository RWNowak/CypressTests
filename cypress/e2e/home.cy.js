describe('Home Page Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the main banner with correct text', () => {
    cy.get('.banner h1').should('contain', 'THE FUTURE');
    cy.get('.banner h1 span').should('contain', 'WAS FIVE MINUTES AGO');
    cy.get('.banner p').should('contain', 'We were there and it is going to be epic');
  });

  it('has a functional SIGN UP button', () => {
    cy.get('.content-right button').contains('SIGN UP TODAY').click();
  });

  it('navigates to the robotics page', () => {
    cy.get('div.adj_text').contains('ROBOTICS').parent().find('.btn-oval').click();
    cy.url().should('include', '/robotics');
  });

  it('checks if images are loaded', () => {
    cy.get('.banner img').should('be.visible');
    cy.get('img[src*="Bitmap"]').should('have.length', 2);
    cy.get('img[src*="shutterstock_211091626.png"]').should('be.visible');
  });

  it('displays all sections with expected headings', () => {
    cy.get('.sec_include h3').should('have.length', 3)
      .and('contain', 'DARK ENERGY')
      .and('contain', 'ROBOTICS')
      .and('contain', 'STRANGERS RISE');
  });
});