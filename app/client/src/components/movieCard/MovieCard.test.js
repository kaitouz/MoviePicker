import React from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { useNavigate } from 'react-router-dom'
import MovieCard from './MovieCard'
import '@testing-library/jest-dom'

jest.mock('react-router-dom', () => {
    return {
        useNavigate: jest.fn()
    }
})

const mockNavigate = useNavigate

const mockProps = {
    item: {
        id: 1,
        title: 'Test Movie',
        poster_path: 'path/to/poster',
        backdrop_path: 'path/to/backdrop'
    },
    category: 'movie'
}

describe('MovieCard', () => {
    afterEach(cleanup)

    it('renders correctly', () => {
        const { getByText } = render(<MovieCard {...mockProps} />)
        expect(getByText('Test Movie')).toBeInTheDocument()
    })

    it('navigates to the correct detail page when the Detail button is clicked', () => {
        const navigate = jest.fn()
        mockNavigate.mockImplementation(() => navigate)
        const { container } = render(<MovieCard {...mockProps} />)
        fireEvent.click(container.getElementsByClassName('btn')[0])
        expect(navigate).toHaveBeenCalledWith('/movie/1')
    })
})
