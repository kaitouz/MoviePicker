import { render, cleanup, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import VideoList from './VideoList'
import tmdbAPI from '../../api/tmdbAPI'

jest.mock('../../api/tmdbAPI')

describe('<VideoList />', () => {
    afterEach(() => {
        cleanup()
        jest.clearAllMocks()
    })

    it('should render teaser and official trailers', async () => {
        tmdbAPI.getVideos.mockResolvedValue({
            results: [
                { key: 'teaser123', name: 'Teaser Trailer' },
                { key: 'official456', name: 'Official Trailer' }
            ]
        })

        const { getByText } = render(<VideoList id='123' category='movie' />)

        await waitFor(() => {
            expect(getByText('Official Teaser')).toBeInTheDocument()
            expect(getByText('Official Trailer')).toBeInTheDocument()
        })
    })
})