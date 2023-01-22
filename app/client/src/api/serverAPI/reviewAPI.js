import axios from 'axios'
import apiConfig from './apiConfig'

const config = (headers, params) => {
    return {
        baseURL: apiConfig.baseURL + '/review',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers },
        params: params
    }
}

const reviewAPI = {
    adddReview: (comment_id, movie_id, content, token) => {
        const headers = {
            x_authorization: token
        }
        const data = { comment_id, movie_id, content }

        return axios.post('/add', data, config(headers, null))
    },
    editReview: (review_id, new_content, token) => {
        const headers = {
            x_authorization: token
        }
        const data = { review_id, new_content }

        return axios.post('/edit', data, config(headers, null))
    },
    deleteReview: (id, token) => {
        const headers = {
            x_authorization: token
        }
        const params = { id }
        return axios.get('/delete', config(headers, params))
    },
    getMovieReviews: (movie_id) => {
        const params = { movie_id }
        return axios.get('/movie-reviews', config(null, params))
    },
    getUserReviews: (token) => {
        const headers = {
            x_authorization: token
        }
        return axios.get('/all', config(headers, null))
    }
}

export default reviewAPI