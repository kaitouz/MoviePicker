describe('Login tests', () => { 
  it('login sucess', () => { 
    cy.visit('http://localhost:3000/login') 
    cy.get('input[id="email"]').type('cypress_test@gmail.com') 
    cy.get('input[id="password"]').type('cypress_test') 
    cy.get('button').click() 

    cy.location('pathname').should('eq', '/') 
  }) 
    
  it('check information', () => { 
    cy.visit('http://localhost:3000/setting') 
    // cy.get('input[id="email"]').type('cypress_test@gmail.com') 
    // cy.get('input[id="password"]').type('cypress_test') 
    // cy.get('button').click() 
    // cy.location('pathname').should('eq', '/') 
  }) 
})