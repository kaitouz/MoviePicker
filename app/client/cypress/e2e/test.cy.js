describe('Login tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login') 
    cy.get('input[id="email"]').type('cypress_test@gmail.com') 
    cy.get('input[id="password"]').type('cypress_test') 
    cy.get('button').click() 

    cy.wait(200)
  })



  // it('test user delete comment', function() {
  //   cy.get('a').contains('Movies').click()
  //   cy.get('input').clear().type('The Banshees of Inisherin');
  //   cy.get('.btn').contains('Search').click();
  //   cy.wait(200)
  //   cy.get('button').contains('Detail').click({force: true});
  //   cy.wait(1000)
  //   cy.get('.comment-card').get('.delete').last()
  //   .should('be.visible')
  //   .click()
  // });
  it('test user setting- change name', function() {
    cy.get('.user-config').should('be.visible').click()
    cy.get('.dropdown-list').get('a').contains('Setting').click({force: true})
    cy.location('pathname').should('eq', '/setting') 
    cy.wait(5000)

    cy.get('.name > .right > input').should('have.value', 'cypress_test');
    cy.get(':nth-child(3) > .right > input').should('have.value', 'cypress_test@gmail.com');
    cy.wait(1000)

    cy.get('.name > .right > input').clear().type('name_changed');
    cy.get('button').contains('Update').click()
    cy.get('.name > .right > input').should('have.value', 'name_changed');
    cy.wait(5000)
    cy.get('.name > .right > input').clear().type('cypress_test');
    cy.get('button').contains('Update').click()
    cy.get('.name > .right > input').should('have.value', 'cypress_test');

  })

  // it('test_bookmarka', function() {
  //   cy.get('.header__nav > :nth-child(2) > a').click();
  //   cy.get('input').clear('The Banshees of Inisherin');
  //   cy.get('input').type('The Banshees of Inisherin');
  //   cy.get('.search > .btn').click();
  //   cy.get('.movie-card > .btn').click();
  // });


  // it('test_edit', function() {
  //   /* ==== Generated with Cypress Studio ==== */
  //   cy.get('.swiper-slide-active > .hero-slide__item > .hero-slide__item__content > .hero-slide__item__content__info > .btns > :nth-child(1)').click();
  //   cy.get('.movie-overview__info__title > .bookmark').should('have.class', 'bookmark');
  //   cy.get('.bookmark__star').should('be.visible');
  // });
})