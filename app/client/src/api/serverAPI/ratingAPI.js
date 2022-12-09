import axios from 'axios'
import apiConfig from './apiConfig'

const config = (headers, params) => {
    return {
        baseURL: apiConfig.baseURL + '/rating',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers },
        params: params
    }
}

const ratingAPI = {
    rateMovie: (movie_id, score, token) => {
        const data = { movie_id, score }
        const headers = {
            x_authorization: token
        }
        return axios.post('/rate-movie', data, config(headers, null))
    },
    getMovieRatings: (movieId) => {
        const params = { movie_id: movieId }
        return axios.get('/movie-ratings', config(null, params))
    },
    getUserRatings: token => {
        const headers = {
            x_authorization: token
        }
        return axios.get('/user-ratings', config(headers, null))
    }
}

export default ratingAPI