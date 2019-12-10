describe ('Cypress test', () => {

    it ('launches', () => {
      cy.visit ('/');
    });

    it ('shows filters', () => {
      cy.visit('/');
      cy.get('[data-cy=create]').should('contain', 'Create New Event');
    });

    it ('allows for filtering after event ID creation', () => {
      cy.visit('/');
      cy.get('[data-cy=create').click();
      cy.get('[data-cy=recommendation').should('contain', 'Get Your Recommendations');
    });
  });