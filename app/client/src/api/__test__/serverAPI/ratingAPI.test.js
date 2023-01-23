import axios from 'axios'
import apiConfig from '../../serverAPI/apiConfig'
import ratingAPI from '../../serverAPI/ratingAPI'

jest.mock('axios')

describe('ratingAPI', () => {
  beforeEach(() => {
    axios.post.mockClear()
    axios.get.mockClear()
  })

  it('should call axios.post with the correct parameters for rateMovie', async () => {
    await ratingAPI.rateMovie(1, 3, 'token123')
    expect(axios.post).toHaveBeenCalledWith('/rate-movie', { movie_id: 1, score: 3 }, {
      baseURL: apiConfig.baseURL + '/rating',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: null
    })
  })

  it('should call axios.get with the correct parameters for getMovieRatings', async () => {
    await ratingAPI.getMovieRatings(1)
    expect(axios.get).toHaveBeenCalledWith('/movie-ratings', {
      baseURL: apiConfig.baseURL + '/rating',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: { movie_id: 1 }
    })
  })

  it('should call axios.get with the correct parameters for getUserRatings', async () => {
    await ratingAPI.getUserRatings('token123')
    expect(axios.get).toHaveBeenCalledWith('/user-ratings', {
      baseURL: apiConfig.baseURL + '/rating',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: null
    })
  })

})
