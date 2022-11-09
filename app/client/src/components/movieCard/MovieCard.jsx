import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import './movieCard.scss'

import { category } from '../../api/tmdbAPI'
import { config } from '../../api/tmdbConfig'



import Button from '../button/Button'

const MovieCard = props => {

    const item = props.item
    const navigate = useNavigate()
    
    const link = '/' + category[props.category] + '/' + item.id
  
    const bg = config.w500Image(item.poster_path || item.backdrop_path);
    
    return (
        <div className='movie-card_container'>
            <div className="movie-card" style={{ backgroundImage: `url(${bg})` }} >
                <Button name='Detail' onClick={() => {navigate(link)}}>
                </Button> 
            </div>
            <h3 className='title'>{item.title || item.name}</h3>
        
        </div>
        
  )
}


export default MovieCard