import axios from 'axios'
import apiConfig from './apiConfig'

const config = (headers, params) => {
    return {
        baseURL: apiConfig.baseURL + '/user',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', ...headers },
        params: params
    }
}

const userAPI = {
    getUserInfo: (id) => {
        const params = { id }
        return axios.get('/public-info', config(null, params))
    },
    resetPassword: (new_password, token) => {
        const headers = {
            x_authorization: token
        }
        const data = { new_password }
        return axios.post('/reset-password', data, config(headers, null))
    },
    changeUsername: (new_name, token) => {
        const headers = {
            x_authorization: token
        }
        const data = { new_name }
        return axios.post('/set-name', data, config(headers, null))
    },
    upLoadAvatar: (file, token) => {
        const formData = new FormData()
        formData.append("image", file)
        return axios({
            method: "post",
            url: `${apiConfig.baseURL}'/user/upload-avatar'`,
            data: formData,
            headers: { 
                "Content-Type": "multipart/form-data", 
                x_authorization: token 
            }
        })
    }
}

export default userAPI