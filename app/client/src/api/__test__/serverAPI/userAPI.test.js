import axios from 'axios'
import apiConfig from '../../serverAPI/apiConfig'
import userAPI from '../../serverAPI/userAPI'

jest.mock('axios')

describe('userAPI', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.post.mockClear()
  })

  it('should call axios.get with the correct parameters for getUserInfo', async () => {
    await userAPI.getUserInfo(1)
    expect(axios.get).toHaveBeenCalledWith('/public-info', {
      baseURL: apiConfig.baseURL + '/user',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      params: { id: 1 }
    })
  })

  it('should call axios.post with the correct parameters for resetPassword', async () => {
    await userAPI.resetPassword('new_password', 'token123')
    expect(axios.post).toHaveBeenCalledWith('/reset-password', { new_password: 'new_password' }, {
      baseURL: apiConfig.baseURL + '/user',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: null
    })
  })

  it('should call axios.post with the correct parameters for changeUsername', async () => {
    await userAPI.changeUsername('new_name', 'token123')
    expect(axios.post).toHaveBeenCalledWith('/set-name', { new_name: 'new_name' }, {
      baseURL: apiConfig.baseURL + '/user',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', x_authorization: 'token123' },
      params: null
    })
  })

})
