import React from 'react'
import PropTypes from 'prop-types'

import './bookmark.scss'

import { FaStar } from 'react-icons/fa'
import bookmarkAPI from '../../api/serverAPI/bookmarkAPI'

const Bookmark = (props) => {
    const addBookmark = () => {
        const movieId = props.movieId
        const category = props.category

        if (!movieId || !category) return

        const token = localStorage.getItem('token')
        if (!token) return console.log('err')

        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        
        if (props.onClick) props.onClick()
        
        bookmarkAPI.addBookmark(movieId, category, token).then(() => {
            bookmarks.push({ movieId, category })
            localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
            if (props.onSuccess) props.onSuccess()
        }).catch(err => {
            console.log(err)
            if (props.onError) props.onError()
        })
    }

    return (
        <div className='bookmark' title='Add to bookmark' onClick={addBookmark}>
            <div className="bookmark__cross"></div>
        </div>
    )
}

export const StarBookmark = (props) => {
    const removeBookmark = () => {
        const movieId = props.movieId
        const category = props.category

        if (!movieId || !category) return

        const token = localStorage.getItem('token')
        if (!token) return console.log('err')

        const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
        
        if (props.onClick) props.onClick()
    
        bookmarkAPI.removeBookmark(movieId, token).then(() => {
            localStorage.setItem('bookmarks', JSON.stringify(
                bookmarks.filter(i => i.movieId !== movieId))
            )
            if (props.onSuccess) props.onSuccess()
        }).catch(err => {
            console.log(err)
            if (props.onError) props.onError()
        })
    }

    return (
        <div className="bookmark star-bm" onClick={removeBookmark}>
            <div className="bookmark__star">
                <FaStar />
            </div>
        </div>
    )
}

Bookmark.propTypes = {
    onClick: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    movieId: PropTypes.string,
    category: PropTypes.string
}

StarBookmark.propTypes = {
    onClick: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    movieId: PropTypes.string,
    category: PropTypes.string
}


export default Bookmark