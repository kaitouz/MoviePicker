import axios from 'axios'
import apiConfig from '../../serverAPI/apiConfig'
import reviewAPI from '../../serverAPI/reviewAPI'

jest.mock('axios')

describe('reviewAPI', () => {
  beforeEach(() => {
    axios.post.mockClear()
    axios.get.mockClear()
  })

  it('should call axios.post with the correct parameters for adddReview', async () => {
    await reviewAPI.adddReview(1, 2, 'content', 'token123')
    expect(axios.post).toHaveBeenCalledWith('/add', { comment_id: 1, movie_id: 2, content: 'content' }, {
      baseURL: apiConfig.baseURL + '/review',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: null
    })
  })

  it('should call axios.post with the correct parameters for editReview', async () => {
    await reviewAPI.editReview(1, 'new_content', 'token123')
    expect(axios.post).toHaveBeenCalledWith('/edit', { review_id: 1, new_content: 'new_content' }, {
      baseURL: apiConfig.baseURL + '/review',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: null
    })
  })

  it('should call axios.get with the correct parameters for deleteReview', async () => {
    await reviewAPI.deleteReview(1, 'token123')
    expect(axios.get).toHaveBeenCalledWith('/delete', {
      baseURL: apiConfig.baseURL + '/review',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: { id: 1 }
    })
  })

  it('should call axios.get with the correct parameters for getMovieReviews', async () => {
    await reviewAPI.getMovieReviews(1)
    expect(axios.get).toHaveBeenCalledWith('/movie-reviews', {
      baseURL: apiConfig.baseURL + '/review',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: { movie_id: 1 }
    })
  })

  it('should call axios.get with the correct parameters for getUserReviews', async () => {
    await reviewAPI.getUserReviews('token123')
    expect(axios.get).toHaveBeenCalledWith('/all', {
      baseURL: apiConfig.baseURL + '/review',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: null
    })
  })

})
