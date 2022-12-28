import React from 'react'

import classes from './catalog.module.scss'

import MovieGrid from '../../components/movieGrid/MovieGrid'
import Search from '../../components/search/Search'

const Catalog = () => {
  return (
    <div className={classes.catalog}>
      <div className={classes.container}>
        <Search />
        <MovieGrid />
      </div>
    </div>
  )
}

export default Catalog