import React from 'react'

import classes from './catalog.module.scss'

import MovieGrid from '../../components/movieGrid/MovieGrid'
import Search from '../../components/search/Search'
import { useNavigate, useParams } from 'react-router-dom'
import { tvGenres, movieGenres } from '../../api/tmdbConfig'

const Catalog = () => {
  const {category} = useParams();
  const navigate = useNavigate()

  const hotSearch = genres => 
    genres.map((item, i) => <div className={classes.genre}
     key={i}
     onClick={() => navigate(`/${category}/genre/${item.id}`)}
    >{item.name}</div>)

  return (
    <div className={classes.catalog}>
      <div className={classes.banner}>
        <div className={classes.content}>
          {
            hotSearch(category === 'movie' ? movieGenres : tvGenres)
          }
        </div>
      </div>
      <div className={classes.container}>
        <Search />
        <MovieGrid />
      </div>
    </div>
  )
}

export default Catalog