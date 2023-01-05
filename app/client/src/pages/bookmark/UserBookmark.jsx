import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import './userBookmark.scss'

import tmdbAPI from '../../api/tmdbAPI'
import MovieCard from '../../components/movieCard/MovieCard'

const UserBookmark = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token')
      if (!token) navigate('/login')
      const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
      let details = []
      for (let i = 0; i < bookmarks.length; i++) {
        const res = await tmdbAPI.detail(bookmarks[i].category, bookmarks[i].movieId, { params: {} })
        details.push({
          item: res,
          category: bookmarks[i].category
        })
      }

      setItems(details)
    }

    fetchData()
  }, [])

  return (
    <div className='user-bookmark'>
      <h1>Bookmarks: </h1>
      <div className="user-bookmark__list">
        {
          items.map((movie, i) => (
            <div className='user-bookmark__list__item' key={i}>
              <MovieCard item={movie.item} category={movie.category}></MovieCard>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default UserBookmark