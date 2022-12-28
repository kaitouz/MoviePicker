import React from 'react'
import { useNavigate } from 'react-router-dom'

import classes from './home.module.scss'

import { category, movieType, tvType } from '../../api/tmdbAPI'
import Button from '../../components/button/Button'
import HeroSlide from '../../components/heroSlide/HeroSlide'
import MovieList from '../../components/movieList/MovieList'

const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <HeroSlide />

      <div className={classes.moviesList}>
        <div className={classes.title}>
          <div>Popular TV Shows</div>
          <Button name='More' onClick={() => navigate('/tv')} />
        </div>
        <MovieList category={category.tv} type={tvType.popular} />
      </div>

      <div className={classes.moviesList}>
        <div className={classes.title}>
          <div>Popular Movies</div>
          <Button name='More' onClick={() => navigate('/movie')} />
        </div>
        <MovieList category={category.movie} type={movieType.popular} />
      </div>
    </>
  )
}

export default Home