import React from 'react'
import { useEffect } from 'react'
import PropTypes from 'prop-types'

import './castList.scss'

import errPoster from '../../assets/err_poster.png'
import tmdbAPI from '../../api/tmdbAPI'
import { useState } from 'react'
import { config } from '../../api/tmdbConfig'

const CastList = (props) => {
    const [cast, setCast] = useState([])

    useEffect(() => {
        const getCredits = async () => {
            const res = await tmdbAPI.credits(props.category, props.id)
            setCast(res.cast.slice(0, 8))
        }
        getCredits()
    }, [])

    return (
        <div className='cast'>
            <h2>Cast</h2>
            <div className="cast-list">
                {cast.map((item, i) => (
                    <div className="cast-list__item" key={i}>
                        <div className="cast-list__item__img" style={{ backgroundImage: `url(${config.w500Image(item.profile_path)}), url(${errPoster})` }}></div>
                        <div className="cast-list__item__name">{item.name}</div>
                        <div className='cast-list__item__character'>{item.character}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

CastList.propTypes = {
    category: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired
}

export default CastList