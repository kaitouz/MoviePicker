import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
//import tmdbAPI from '../../api/tmdbAPI'
import MovieCard from '../../components/movieCard/MovieCard'

const Bookmark = () => {
  const navigate = useNavigate()
  const [items, setItems] = useState([])

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) navigate('/login')
    const bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    setItems([1,2,2])
    bookmarks.forEach(movieId => console.log(movieId))
  }, [])

  return (
    <div className='user-bookmark'>
         {
          items.map((item, i) => (
            <MovieCard key={i}></MovieCard>
          ))
         }
    </div>
  )
}

export default Bookmark