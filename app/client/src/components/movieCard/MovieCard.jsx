import React from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import './movieCard.scss'

import errPoster from '../../assets/err_poster.png'
import { category } from '../../api/tmdbAPI'
import { config } from '../../api/tmdbConfig'
import Button from '../button/Button'

const MovieCard = props => {
    const navigate = useNavigate()
    const item = props.item
    const link = '/' + category[props.category] + '/' + item.id
    const bg = config.w500Image(item.poster_path || item.backdrop_path);

    return (
        <div className='movie-card_container'>
            <div className="movie-card" style={{ backgroundImage: `url(${bg}), url(${errPoster})` }} >
                <Button name='Detail' onClick={() => {
                    navigate(link)
                    navigate(0)
                }}>
                </Button>
            </div>
            <h3 className='title'>{item.title || item.name}</h3>
        </div>
    )
}

MovieCard.propTypes = {
    item: PropTypes.object,
    category: PropTypes.string
}

export default MovieCard