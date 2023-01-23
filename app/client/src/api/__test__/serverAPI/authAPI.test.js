import axios from 'axios'
import apiConfig from '../../serverAPI/apiConfig'
import authAPI from '../../serverAPI/authAPI'

jest.mock('axios')

describe('AuthAPI', () => {
  beforeEach(() => {
    axios.post.mockClear()
  })

  it('should call axios.post with the correct parameters for register', async () => {
    await authAPI.register('John Doe', 'johndoe@example.com', 'password123')
    expect(axios.post).toHaveBeenCalledWith('/register', { name: 'John Doe', email: 'johndoe@example.com', password: 'password123' }, {
      baseURL: apiConfig.baseURL + '/auth',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: null
    })
  })

  it('should call axios.post with the correct parameters for login', async () => {
    await authAPI.login('johndoe@example.com', 'password123')
    expect(axios.post).toHaveBeenCalledWith('/login', { email: 'johndoe@example.com', password: 'password123' }, {
      baseURL: apiConfig.baseURL + '/auth',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: null
    })
  })

  it('should call axios.post with the correct parameters for refreshToken', async () => {
    await authAPI.refreshToken('refreshToken123', 'token123')
    expect(axios.post).toHaveBeenCalledWith('/refresh', { refreshToken: 'refreshToken123' }, {
      baseURL: apiConfig.baseURL + '/auth',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: null
    })
  })

})
