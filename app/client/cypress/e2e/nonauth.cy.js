/* ==== Test Created with Cypress Studio ==== */
it('test_homepage_nonauth', function() {
  /* ==== Generated with Cypress Studio ==== */
  cy.visit('http://localhost:3000/');
  cy.get(':nth-child(1) > .hero-slide__item > .hero-slide__item__content > .hero-slide__item__content__info > .title').should('be.visible');
  cy.get('.swiper-slide-active > .hero-slide__item > .hero-slide__item__content > .hero-slide__item__content__info > .overview').should('be.visible');
  cy.get('.swiper-slide-active > .hero-slide__item > .hero-slide__item__content > .hero-slide__item__content__info > .title > .release-date').should('be.visible');
  cy.get('.swiper-slide-active > .hero-slide__item > .hero-slide__item__content > .hero-slide__item__content__info > .btns > :nth-child(1)').should('be.visible');
  cy.get('.swiper-slide-active > .hero-slide__item > .hero-slide__item__content > .hero-slide__item__content__info > .btns > :nth-child(2)').should('be.visible');
  cy.get('.logo > a').should('be.visible');
  cy.get('.logo > img').should('be.visible');
  cy.get('.active > a').should('be.visible');
  cy.get(':nth-child(2) > a').should('be.visible');
  cy.get('.header__nav > :nth-child(3) > a').should('be.visible');
  cy.get('.fa').should('be.visible');
  cy.get(':nth-child(2) > .home_title__qJOOZ > div').should('be.visible');
  cy.get(':nth-child(3) > .home_title__qJOOZ > div').should('be.visible');
  /* ==== End Cypress Studio ==== */
});