describe('Test authorized', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/login') 
    cy.get('input[id="email"]').type('cypress_test@gmail.com') 
    cy.get('input[id="password"]').type('cypress_test') 
    cy.get('button').click() 
  })

  it('login successful', () => { 
    cy.location('pathname').should('eq', '/') 
  })

  it('test user setting- change name', function() {
    cy.get('.user-config').should('be.visible').click()
    cy.get('.dropdown-list').get('a').contains('Setting').click({force: true})
    cy.location('pathname').should('eq', '/setting') 
    cy.wait(2000)

    cy.get('.name > .right > input').should('have.value', 'cypress_test');
    cy.get(':nth-child(3) > .right > input').should('have.value', 'cypress_test@gmail.com');
    cy.wait(1000)

    cy.get('.name > .right > input').clear().type('name_changed');
    cy.get('button').contains('Update').click()
    cy.get('.name > .right > input').should('have.value', 'name_changed');
    cy.wait(2000)
    cy.get('.name > .right > input').clear().type('cypress_test');
    cy.get('button').contains('Update').click()
    cy.get('.name > .right > input').should('have.value', 'cypress_test');

  })

  it('test user post comment', function() {
    cy.get('a').contains('Movies')
      .click()
    cy.get('input')
      .clear()
      .type('The Banshees of Inisherin');
    cy.get('.btn').contains('Search')
      .click();
    cy.wait(2000)

    cy.get('button').contains('Detail')
      .click({force: true});
    cy.wait(2000)

    cy.get('.comments__input > input')
      .clear('')
      .type('cypress-test-comment-last');
    cy.get('.comments__input > button')
      .click();
    cy.wait(2000)

    cy.get('.comment-card__header > h3')
      .should('be.visible');
    cy.get('.comment-card__content > p')
      .should('be.visible');
    cy.get('.comment-card__content > p')
      .last().should('have.text', 'cypress-test-comment-last');
    cy.wait(2000)
  });


  it('test user delete comment', function() {
    cy.get('a').contains('Movies').click()
    cy.get('input')
      .clear()
      .type('The Banshees of Inisherin');
    cy.get('.btn').contains('Search')
      .click();
    cy.wait(2000)

    cy.get('button').contains('Detail')
      .click({force: true});
    cy.wait(2000)

    cy.get('.comment-card').get('.delete').last()
      .should('be.visible')
      .click()
    cy.wait(2000)
  });

  var movie_title = "";
  it('test_bookmark', function() {
    cy.get('.swiper-slide-active > .hero-slide__item > .hero-slide__item__content > .hero-slide__item__content__info > .btns').contains('Detail').click();
    cy.wait(2000)
    cy.get('.movie-overview__info__title > .title').then(($title) => {
      movie_title = $title.text().replace(/\s*$/,'');
      cy.log(movie_title);
    })
    cy.get('.movie-overview__info__title > .bookmark').should('have.class', 'bookmark').should('be.visible').click();
    cy.wait(2000)
    cy.get('.bookmark__star').should('have.class', 'bookmark__star').should('be.visible');    
    cy.wait(2000)
    cy.get('.bookmark__star').should('have.class', 'bookmark__star').should('be.visible').click();    
    cy.wait(2000)

  });
})