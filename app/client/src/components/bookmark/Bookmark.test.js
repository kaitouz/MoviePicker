import { render, screen, fireEvent, getDefaultNormalizer, waitFor } from "@testing-library/react"
import apiConfig from "../../api/serverAPI/apiConfig"
import axios from "axios"
import '@testing-library/jest-dom'
import Bookmark from './Bookmark'



test('bookmark test', async () =>  {
    let marked = false;
    const {container} = render(<Bookmark movieId='1211' category='movie' onClick={() => marked = true} 
    onSuccess={() => console.log('success')} onError={() => console.log('err')}/>)

    const account = {
        email: 'bookmarktest@gmail.com',
        password: 'bookmarktest'
    }

    const response = await axios.post(`${apiConfig.baseURL}/auth/login`, account)
    localStorage.setItem('token', response.data.accessToken)

    fireEvent.click(container.getElementsByClassName('bookmark')[0])
    
    expect(marked).toBe(true)
})