import axios from "axios"
import apiConfig from "./apiConfig"

const config = (headers, params) => {
    return {
        baseURL: apiConfig.baseURL + '/auth',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers },
        params: params
    }
}

const authAPI = {
    register: (name, email, password) => {
        const data = { name, email, password }
        return axios.post('/register', data, config(null, null))
    },
    login: (email, password) => {
        const data = { email, password }
        return axios.post('/login', data, config(null, null))
    },
    refreshToken: (refreshToken, token) => {
        const data = { refreshToken }
        const headers = {
            x_authorization: token
        }
        return axios.post('/refresh', data, config(headers, null))
    }
}

export default authAPI