import axios from 'axios'
import { stringify } from 'query-string'
import { config } from './tmdbConfig'

const axiosClient = axios.create({
    baseURL: config.baseUrl,
    headers: {
        'Content-Type': 'application/json'
    },
    paramsSerializer: {
        serialize: params => stringify({ ...params, api_key: config.apiKey })
    }
}
)

axiosClient.interceptors.request.use(async config => config)

axiosClient.interceptors.response.use(res => {
    console.log(res.request.responseURL)
    if (res && res.data)
        return res.data
    return res
}, err => {
    throw err
})


export const category = {
    movie: 'movie',
    tv: 'tv'
}

export const movieType = {
    upcoming: 'upcoming',
    popular: 'popular',
    top_rated: 'top_rated'
}

export const tvType = {
    popular: 'popular',
    top_rated: 'top_rated',
    on_the_air: 'on_the_air'
}

const tmdbAPI = {
    getMoviesList: (type, params) => {
        const url = 'movie/' + movieType[type];
        return axiosClient.get(url, { params });
    },
    getTvList: (type, params) => {
        const url = 'tv/' + tvType[type];
        return axiosClient.get(url, { params });
    },
    getVideos: (cate, id) => {
        const url = category[cate] + '/' + id + '/videos';
        return axiosClient.get(url, { params: {} });
    },
    search: (cate, params) => {
        const url = 'search/' + category[cate];
        return axiosClient.get(url, { params });
    },
    searchByGenres: (cate, genres, page) => {
        const url = `discover/${category[cate]}/`
        const params = {
            with_genres: genres,
            page: page
        }
        return axiosClient.get(url, { params })
    },
    detail: (cate, id, params) => {
        const url = category[cate] + '/' + id;
        return axiosClient.get(url, { params });
    },
    credits: (cate, id) => {
        const url = category[cate] + '/' + id + '/credits';
        return axiosClient.get(url, { params: {} });
    },
    similar: (cate, id) => {
        const url = category[cate] + '/' + id + '/similar';
        return axiosClient.get(url, { params: {} });
    }
}

export default tmdbAPI