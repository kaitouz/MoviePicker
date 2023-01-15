import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import './movieCard.scss'

import errPoster from '../../assets/err_poster.png'
import { category } from '../../api/tmdbAPI'
import { config } from '../../api/tmdbConfig'
import Button from '../button/Button'
import Bookmark, { StarBookmark } from '../bookmark/Bookmark'
import Loading from '../loading/Loading'

const MovieCard = props => {
    const navigate = useNavigate()
    const item = props.item
    const movieId = item.id.toString()
    const link = '/' + category[props.category] + '/' + item.id
    const bg = config.w500Image(item.poster_path || item.backdrop_path);

    const [marked, setMarked] = useState(false)
    const [processBm, setProcessBm] = useState(false)

    useEffect(() => {
        const userBookmarks = localStorage.getItem('bookmarks')
        if (!userBookmarks) return
        const bookmarks = JSON.parse(userBookmarks)
        setMarked(bookmarks.findIndex(i => i.movieId === movieId) !== -1)
    })
 
    return (
        <div className='movie-card_container'>
            <div className="movie-card" style={{ backgroundImage: `url(${bg}), url(${errPoster})` }} >
                {
                    processBm ? <div className={`bookmark ${marked ? 'star-bm' : null}`}><Loading /></div> : 
                        (marked ? 
                            <StarBookmark movieId={item.id.toString()}
                                category={props.category}
                                onClick={() => {setProcessBm(true)}}
                                onSuccess = {() => {
                                    setProcessBm(false)
                                    setMarked(false)
                                }} 
                                onError={() => setProcessBm(false)}
                                /> :
                            <Bookmark movieId={item.id.toString()}
                                category={props.category}
                                onClick={() => setProcessBm(true)}
                                onSuccess={() => {
                                    setProcessBm(false)
                                    setMarked(true)
                                }}
                                onError={() => setProcessBm(false)} 
                                />
                        )
                } 
                <Button name='Detail' onClick={() => {
                    navigate(link)
                    navigate(0)
                }}>
                </Button>
            </div>

            <div className="title">
                <h3>{item.title || item.name} </h3>
            </div>
            
        </div>
    )
}

MovieCard.propTypes = {
    item: PropTypes.object,
    category: PropTypes.string
}

export default MovieCard