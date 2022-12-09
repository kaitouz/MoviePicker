import React, { useRef } from 'react';
import PropTypes from 'prop-types';

import './movieFrame.scss';

const MovieFrame = (props) => {
    const modal = useRef(null)
    const closeFrame = () => {
        modal.current.classList.remove('active')
        if (props.onClose) props.onClose()
    }

    return (
        <div id={props.id} ref={modal} className='movie-frame'>
            <div className="movie-frame__content">
                <div className="movie-frame__content__closeBtn">
                    <div onClick={closeFrame}>X</div>
                </div>
                <div className="movie-frame__content__video">
                    {props.children}
                </div>
            </div>
        </div>
    )
}

MovieFrame.propTypes = {
    id: PropTypes.string,
    children: PropTypes.any,
    onClose: PropTypes.func
}

export default MovieFrame