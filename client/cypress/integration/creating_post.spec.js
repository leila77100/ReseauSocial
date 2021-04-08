describe('Affichage trending',()=> {
    it('Afficher le post le plus liké', ()=> {
        cy.visit('http://localhost:3000')
        cy.get('[data-testid="postn1"]').type('post like')
        cy.get('[data-testid="cheminTrending"]').click()
        cy.get('[data-testid="emailUser"]').should('have.value', "")
        cy.contains('New message')
    });
})