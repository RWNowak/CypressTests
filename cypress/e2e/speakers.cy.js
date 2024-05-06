describe('Featured Speaker Button Test', () => {
  beforeEach(() => {
    // Visit the page where the Featured Speaker button is located
    cy.visit('/conference/speakers'); // Change this to your actual URL
    
    // Mock the GraphQL mutation that marks the speaker as featured
    cy.intercept('POST', '/graphql', (req) => {
      if (req.body.operationName === 'markFeatured') {
        // Check if the right variables are passed to the mutation
        expect(req.body.variables).to.deep.include({
          speakerId: '381b010e-f51d-4fca-a249-271f72a6a5b9', // Use actual expected ID
          featured: true
        });

        // Respond as if the mutation succeeded
        req.reply({
          data: {
            markFeatured: {
              id: '381b010e-f51d-4fca-a249-271f72a6a5b9',
              featured: true
            }
          }
        });
      }
    }).as('markFeatured');
  });

  it('marks a speaker as featured when the button is clicked', () => {
    // Check that the button exists and the initial state of the icon is 'fa-star-o'
    cy.get('button.btn-default').should('exist').find('i.fa').should('have.class', 'fa-star-o').first();

    // Click the button
    cy.get('button.btn-default').first().click();

    // Wait for the 'markFeatured' mutation to be called
    cy.wait('@markFeatured');

    // After clicking the button, the icon should change to 'fa-star' and the color to gold
    cy.get('button.btn-default').find('i.fa').should('have.class', 'fa-star').and('have.css', 'color', 'rgb(255, 215, 0)'); // Gold in RGB
  });
});