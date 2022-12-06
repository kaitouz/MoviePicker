import React, { useState, useEffect } from 'react'
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import PropTypes from 'prop-types'

import 'swiper/swiper-bundle.css';
import './heroSlide.scss'

import tmdbAPI, { movieType } from '../../api/tmdbAPI'
import { config } from '../../api/tmdbConfig'
import { useNavigate } from 'react-router-dom';
import Button from '../button/Button';

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
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                autoplay={{ delay: 5000 }}
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
        </div>
    )
}

const HeroSlideItem = props => {
    let navigate = useNavigate()
    const item = props.item
    const background = config.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)
    const setModelActive = () => { }

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
                        <Button onClick={() => navigate(`/movie/${item.id}`)} name='Watch now' />
                        <Button onClick={setModelActive} name='Watch trailer' />
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