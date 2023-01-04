import axios from 'axios'
import apiConfig from './apiConfig'

const config = (headers, params) => {
    return {
        baseURL: apiConfig.baseURL + '/bookmark',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers },
        params: params
    }
}

const bookmarkAPI = {
    addBookmark: (movie_id, category, token) => {
        const params = { movie_id, category }
        const headers = {
            x_authorization: token
        }
        return axios.get('/add', config(headers, params))
    },
    removeBookmark: (movie_id, token) => {
        const params = { movie_id }
        const headers = {
            x_authorization: token
        }
        return axios.get('/remove', config(headers, params))
    },
    userBookmarks: token => {
        const headers = {
            x_authorization: token
        }
        return axios.get('/all', config(headers, null))
    }
}

export default bookmarkAPI;