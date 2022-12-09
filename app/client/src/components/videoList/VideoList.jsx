import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

import './videoList.scss'

import tmdbAPI from '../../api/tmdbAPI'

const VideoList = props => {
    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideos = async () => {
            const res = await tmdbAPI.getVideos(props.category, props.id)
            const results = res.results
            let teaser = -1
            let official = -1
            results.every((element, i) => {
                if (teaser > -1 && official > -1) return false;
                const movieName = element.name.toLowerCase()
                const search1 = movieName.search('teaser')
                const search2 = movieName.search('trailer')

                if (search1 >= 0) teaser = i
                if (search2 >= 0) official = i
                return true
            });
            if (teaser < 0) teaser = 0
            if (official < 0) official = 1
            setVideos([results[teaser], results[official]])
        }

        getVideos()
    }, [])

    return (
        videos.length === 0 ? <></> :
            <div className="video-list">
                <div className="video-list__teaser">
                    <h2>Official Teaser</h2>
                    <iframe
                        src={`https://www.youtube.com/embed/${videos[0] ? videos[0].key : ''}`}
                        width="100%"
                        title="video"
                    ></iframe>
                </div>
                <div className="video-list__official">
                    <h2>Official Trailer</h2>
                    <iframe
                        src={`https://www.youtube.com/embed/${videos[1] ? videos[1].key : ''}`}
                        width="100%"
                        title="video"
                    ></iframe>
                </div>
            </div>
    )
}

VideoList.propTypes = {
    id: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired

}

export default VideoList