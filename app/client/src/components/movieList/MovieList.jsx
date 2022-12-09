import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';
import { SwiperSlide, Swiper } from 'swiper/react';

import 'swiper/swiper-bundle.css';
import './movieList.scss'

import MovieCard from '../movieCard/MovieCard';
import tmdbAPI, { category } from '../../api/tmdbAPI';

const MovieList = props => {
    const [items, setItems] = useState([])

    useEffect(() => {
        console.log('render')
        const fetchData = async () => {
            let response = null
            if (props.type !== 'similar') {
                switch (props.category) {
                    case category.movie:
                        response = await tmdbAPI.getMoviesList(props.type, {})
                        break;
                    default:
                        response = await tmdbAPI.getTvList(props.type, {})
                }
            } else {
                response = await tmdbAPI.similar(props.category, props.id)
            }
            setItems(response.results)
        }
        fetchData()
    }, [])

    return (
        <div className='movie-list'>
            <Swiper
                grabCursor={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {
                    items ? items.map((item, i) => (
                        <SwiperSlide key={i}>
                            <MovieCard item={item} category={props.category} />
                        </SwiperSlide>
                    )) : null
                }
            </Swiper>
        </div>
    )
}

MovieList.propTypes = {
    category: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    id: PropTypes.any
}

export default MovieList