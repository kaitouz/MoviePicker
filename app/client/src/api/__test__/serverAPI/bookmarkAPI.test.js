import axios from 'axios'
import apiConfig from '../../serverAPI/apiConfig'
import bookmarkAPI from '../../serverAPI/bookmarkAPI'

jest.mock('axios')

describe('bookmarkAPI', () => {
  beforeEach(() => {
    axios.get.mockClear()
  })

  it('should call axios.get with the correct parameters for addBookmark', async () => {
    await bookmarkAPI.addBookmark(1, 'category', 'token123')
    expect(axios.get).toHaveBeenCalledWith('/add', {
      baseURL: apiConfig.baseURL + '/bookmark',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: { movie_id: 1, category: 'category' }
    })
  })

  it('should call axios.get with the correct parameters for removeBookmark', async () => {
    await bookmarkAPI.removeBookmark(1, 'token123')
    expect(axios.get).toHaveBeenCalledWith('/remove', {
      baseURL: apiConfig.baseURL + '/bookmark',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: { movie_id: 1 }
    })
  })

  it('should call axios.get with the correct parameters for userBookmarks', async () => {
    await bookmarkAPI.userBookmarks('token123')
    expect(axios.get).toHaveBeenCalledWith('/all', {
      baseURL: apiConfig.baseURL + '/bookmark',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: null
    })
  })
})
