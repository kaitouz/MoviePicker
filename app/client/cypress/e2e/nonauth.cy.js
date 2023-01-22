describe('Nonauth tests', () => {
  it('test visible of homepage', function() {
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
  });

  it('test visible of movie details', function() {
    cy.visit('http://localhost:3000/');
    cy.get('.swiper-slide-active > .hero-slide__item > .hero-slide__item__content > .hero-slide__item__content__info > .btns > :nth-child(1)').click();
    cy.get('.movie-overview__info__title > .title').should('be.visible');
    cy.get('.movie-overview__poster__img').should('be.visible');
    cy.get('.score__average').should('be.visible');
    cy.get('.video-list__teaser > h2').should('be.visible');
    cy.get('.video-list__teaser').should('be.visible');
    cy.get('.video-list__official').should('be.visible');
    cy.get('.plot-sumamry > h1').should('be.visible');
    cy.get('.cast > h2').should('be.visible');
    cy.get('.cast-list').should('be.visible');
    cy.get('.comments > h2').should('be.visible');
    cy.get('.similar-movie-list > h2').should('be.visible');
    cy.get('.footer').should('be.visible');
    cy.get('.header__nav > :nth-child(1)').should('be.visible');
    cy.get(':nth-child(2) > a').should('be.visible');
    cy.get('.logo > a').should('be.visible');
    cy.get('.header__nav > :nth-child(3) > a').should('be.visible');
    cy.get('.fa').should('be.visible');
  });

  it('test visible of tv boards', function() {
    cy.visit('http://localhost:3000/');
    cy.get(':nth-child(2) > .home_title__qJOOZ > .btn').click();
    cy.get('.header__wrap').should('be.visible');
    cy.get('.catalog_banner__30h0F').should('be.visible');
    cy.get('input').should('be.visible');
    cy.get('input').should('have.attr', 'placeholder', 'Enter keyword...');
    cy.get('.search__dropdown__button').should('be.visible');
    cy.get('.search__dropdown__button').should('have.class', 'search__dropdown__button');
    cy.get('.search > .btn').should('be.enabled');
    cy.get('.search > .btn').should('be.visible');
    cy.get('.search > .btn').should('have.text', 'Search');
    cy.get('.movie-grid__title').should('be.visible');
    cy.get(':nth-child(1) > .movie-card_container > .movie-card').should('be.visible');
    cy.get(':nth-child(1) > .movie-card_container > .movie-card').should('have.text', 'Detail');
    cy.get('.movie-grid__items__load-more > .btn').should('be.visible');
    cy.get('.footer').should('be.visible');
  });

  it('test visible of movie boards', function() {
    cy.visit('http://localhost:3000/');
    cy.get(':nth-child(3) > .home_title__qJOOZ > .btn').click();
    cy.get('.catalog_banner__30h0F').should('be.visible');
    cy.get('.header__wrap').should('be.visible');
    cy.get('.fa').should('be.visible');
    cy.get('input').should('be.visible');
    cy.get('input').should('have.attr', 'placeholder', 'Enter keyword...');
    cy.get('.search__dropdown__button > :nth-child(1)').should('be.visible');
    cy.get('.search__dropdown__button').should('be.visible');
    cy.get('.search__dropdown__button').should('have.class', 'search__dropdown__button');
    cy.get('.search > .btn').should('be.visible');
    cy.get('.search > .btn').should('have.text', 'Search');
    cy.get('.movie-grid__title').should('be.visible');
    cy.get('.movie-grid__title').should('have.text', 'Upcomming movies:');
    cy.get(':nth-child(1) > .movie-card_container > .movie-card').should('be.visible');
    cy.get(':nth-child(1) > .movie-card_container > .movie-card > .btn').should('have.text', 'Detail');
    cy.get('.footer').should('be.visible');
  });


  it('test pick-random movie from movie board', function() {
    cy.visit('http://localhost:3000/');
    cy.get(':nth-child(2) > a').click();
    cy.get('button').contains('Detail').click({force: true});
    cy.get('.movie-overview__info__title > .title').should('be.visible');
    cy.get('.fa').should('be.visible');
    cy.get('.movie-overview__poster__img').should('be.visible');
  });

  it('test pick-random tv-serie from tv board', function() {
    cy.visit('http://localhost:3000/');
    cy.get('.header__nav').click();
    cy.get('button').contains('Detail').click({force: true});
    cy.get('.movie-overview__info__title > .title').should('be.visible');
    cy.get('.fa').should('be.visible');
    cy.get('.movie-overview').should('be.visible');
  });

  it('test pick genre in movie board ', function() {
    cy.visit('http://localhost:3000/');
    cy.get('a').contains('Movies').click();
    cy.get('div').contains('Action').click();
    cy.url().should('include', '/movie/genre/28')
    cy.get('b').should('have.text', 'Action');


    cy.get('div').contains('Adventure').click();
    cy.get('b').should('have.text', 'Adventure');

    cy.get('div').contains('Animation').click();
    cy.get('b').should('have.text', 'Animation');

    cy.get('div').contains('Comedy').click();
    cy.get('b').should('have.text', 'Comedy');

    cy.get('div').contains('Crime').click();
    cy.get('b').should('have.text', 'Crime');

    cy.get('div').contains('Documentary').click();
    cy.get('b').should('have.text', 'Documentary');
  });

  it('test pick genre in tv board ', function() {
    cy.visit('http://localhost:3000/');
    cy.get('a').contains('TV Series').click();
    cy.get('div').contains('Western').click();
    cy.get('b').should('have.text', 'Western');

    cy.get('div').contains('Drama').click();
    cy.get('b').should('have.text', 'Drama');

    cy.get('div').contains('Animation').click();
    cy.get('b').should('have.text', 'Animation');

    cy.get('div').contains('Talk').click();
    cy.get('b').should('have.text', 'Talk');

    cy.get('div').contains('News').click();
    cy.get('b').should('have.text', 'News');

    cy.get('div').contains('Documentary').click();
    cy.get('b').should('have.text', 'Documentary');
  });
})