describe('Session Submission Tests', () => {
  beforeEach(() => {
    cy.visit('/conference/sessions/new');
  });

  it('loads the submission form', () => {
    cy.get('form').should('exist');
    cy.get('h3').should('contain', 'Submit a Session!');
  });

  it("should submit a session successfully", () => {
    // Filling the form with session information
    cy.contains("Title").type("New session title");
    cy.contains("Description").type("This is the greatest session");
    cy.contains("Day").type("Thursday");
    cy.contains("Level").type("Advanced");

    // Submit the form
    cy.get("form").submit();

    // Validate that form was submitted successfully
    cy.contains("Session Submitted Successfully");
  });
  it('displays the session', ()=>{
    cy.visit('/conference/sessions');
    cy.contains('All Sessions').click();
    cy.contains('New session title').should('be.visible');
  });
});