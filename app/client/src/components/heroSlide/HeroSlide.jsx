import React, { useState, useEffect } from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import PropTypes from 'prop-types'

import 'swiper/swiper-bundle.css';
import './heroSlide.scss'

import tmdbAPI, { category, movieType } from '../../api/tmdbAPI'
import { config } from '../../api/tmdbConfig'
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';
import MovieFrame from '../movieFrame/MovieFrame';

const HeroSlide = () => {
    SwiperCore.use([Autoplay])
    const [movieItems, setMovieItems] = useState([])

    useEffect(() => {
        tmdbAPI.getMoviesList(movieType.popular, {})
            .then(res => {
                setMovieItems(res.results)
            })
    }, [])

    return (
        <div className='hero-slide'>
            <Swiper
                modules={[Autoplay]}
                //grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 7000 }}
            >
                {
                    movieItems.map((item, i) => (
                        <SwiperSlide key={i}>
                            {({ isActive }) => (
                                <HeroSlideItem item={item} className={`${isActive ? 'active' : ''}`} />
                            )}
                        </SwiperSlide>

                    ))


                }
            </Swiper>

            {movieItems.map((item, i) =>
                <MovieFrame id={`frame_${item.id}`} key={i} onClose={() => {
                    const iframe = document.getElementById(`frame_${item.id}`).querySelector('.movie-frame__content__video > iframe')
                    if (iframe) {
                        const videoSrc = iframe.src
                        iframe.src = videoSrc
                    }
                }}>
                    <iframe style={{ width: '100%', verticalAlign: 'middle', height: '100vmin', maxHeight: '500px' }} />
                </MovieFrame>)}
        </div>
    )
}

const HeroSlideItem = props => {
    let navigate = useNavigate()
    const item = props.item
    const background = config.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const setModelActive = async () => {
        const movieFrame = document.getElementById(`frame_${item.id}`)
        const iframe = movieFrame.querySelector('.movie-frame__content__video > iframe')
        if (iframe.getAttribute('src') !== null) {
            console.log(iframe.getAttribute('src'))
            return movieFrame.classList.toggle('active')
        }

        const videos = await tmdbAPI.getVideos(category.movie, item.id)
        if (videos.results.length > 0) {
            const videSrc = 'https://www.youtube.com/embed/' + videos.results[0].key
            movieFrame.querySelector('.movie-frame__content__video > iframe').setAttribute('src', videSrc)
        } else {
            movieFrame.querySelector('.movie-frame__content__video').innerHTML = 'No trailer'
        }

        movieFrame.classList.toggle('active')
    }

    return (
        <div
            className={`hero-slide__item ${props.className}`}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">
                        {item.title}
                        <div className='release-date'>{new Date(item.release_date).toLocaleDateString()}</div>
                    </h2>
                    <div className="overview">{item.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate(`/movie/${item.id}`)} name='Detail' />
                        <Button onClick={setModelActive} name='Trailer' />
                    </div>
                </div>
                <div className="hero-slide__item__content__poster">
                    <img src={config.w500Image(item.poster_path)} alt="" />
                </div>
            </div>
        </div>
    )
}

HeroSlideItem.propTypes = {
    item: PropTypes.object,
    className: PropTypes.string
}

export default HeroSlide