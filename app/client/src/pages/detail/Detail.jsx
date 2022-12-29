import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import './detail.scss'

import errPoster from '../../assets/err_poster.png'
import tmdbAPI from '../../api/tmdbAPI'
import { config } from '../../api/tmdbConfig'
import ratingAPI from '../../api/serverAPI/ratingAPI'
import logo from '../../assets/logo.png'
import VideoList from '../../components/videoList/VideoList'
import MovieList from '../../components/movieList/MovieList'
import CastList from '../../components/castList/CastList'
import Comments from '../../components/comments/Comments'

const Detail = () => {
  const navigate = useNavigate()
  const { category, id } = useParams()
  const [item, setItem] = useState(null)
  const [popcornScore, setPopcornScore] = useState(null)
  const [userRating, setUserRating] = useState(null)
  const [cate, setCate] = useState(category)
  const [movieId, setMovieId] = useState(id)

  useEffect(() => {
    const getDetail = async () => {
      tmdbAPI.detail(category, id, { params: {} }).then(response => { setItem(response) })
      const res = await ratingAPI.getMovieRatings(id)
      const ratings = res.data

      const user = JSON.parse(localStorage.getItem('user'))

      if (ratings !== null && ratings.length !== 0) {
        let sum = 0;
        ratings.forEach(item => {
          sum += item.score
          if (user && item.user_id === user.id) setUserRating(item.score)
        })
        setPopcornScore(Math.round(sum / ratings.length * 10) / 10)
      }
    }

    setCate(category)
    setMovieId(id)
    getDetail();
  }, [category, id])

  const rateMovie = (score) => {
    const token = localStorage.getItem('token')
    if (!token) {
      const notification = document.getElementById('rating-alert')
      if (!notification.classList.contains('active')) {
        notification.classList.add('active')
        setTimeout(() => notification.classList.remove('active'), 5000)
      }
      return
    }
    setUserRating(score)
    ratingAPI.rateMovie(id, score, token).catch(err => console.log(err))
  }

  const searchByGenre = (genre_id) => {
    console.log('search', genre_id)
    tmdbAPI.searchByGenres(category, genre_id).then(res => console.log(res))
    navigate(`/${category}/genre/${genre_id}`)
  }

  const getBgURL = () => (item.backdrop_path || item.poster_path) ? config.originalImage(item.backdrop_path || item.poster_path) : errPoster

  return (
    <>
      {
        item && (
          <>
            <div className="banner" style={{ backgroundImage: `url(${config.originalImage(item.backdrop_path || item.poster_path)})` }}></div>
            <div className="movie-overview">
              <div className="movie-overview__poster">
                <div className="movie-overview__poster__img" style={{ backgroundImage: `url(${getBgURL()})` }}></div>
              </div>
              <div className="movie-overview__info">
                <h1 className="title">
                  {item.title || item.name}
                </h1>
                <div className="release-date">
                  {new Date(item.release_date || item.first_air_date).toLocaleDateString()}
                </div>
                <div className="genres">
                  {
                    item.genres && item.genres.slice(0, 5).map((genre, i) => (
                      <span key={i} className="genres__item" onClick={() => searchByGenre(genre.id)}>{genre.name}</span>
                    ))
                  }
                </div>
                <div className="score">
                  <div className="score__popcorn">
                    <img src={logo}></img>
                    <div className="rating">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num =>
                        <div key={num} onMouseDown={() => rateMovie(num)}>
                          {num}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="notification" id='rating-alert'>Please login or sign up to rate movie</div>
                  <div className='score__user-rating'>
                    {userRating ? userRating : '__'}
                  </div>
                  <div>
                    Average score: {popcornScore ? popcornScore : '__'}
                  </div>
                </div>
              </div>
            </div>
            <div className="movie-content">
              <VideoList id={movieId} category={cate}></VideoList>
              <div className="movie-content__info">
                <div className="movie-content__info__about">
                  <div className="plot-sumamry">
                    <h1>Plot summary</h1>
                    <div className="overview">{item.overview}</div>
                  </div>
                  <div className='cast'>
                    <CastList category={cate} id={movieId}></CastList>
                  </div>
                </div>
                <div className="movie-content__info__comment">
                  <Comments id={movieId}></Comments>
                </div>
              </div>
            </div>
            <div className="similar-movie-list">
              <h2>You may be interested in</h2>
              <MovieList category={category} type="similar" id={item.id} />
            </div>
          </>
        )
      }
    </>
  )
}

export default Detail