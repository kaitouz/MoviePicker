import React from 'react'
import { render, waitFor, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import CastList from './CastList'
import tmdbAPI from '../../api/tmdbAPI'

jest.mock('../../api/tmdbAPI')

describe('<CastList />', () => {
    beforeEach(() => {
        tmdbAPI.credits.mockResolvedValue({
            cast: [
                { id: 1255540, name: 'Allison Williams', character: 'Gemma' },
                { id: 2131391, name: 'Violet McGraw', character: 'Cady' },
                { id: 2043430, name: 'Jenna Davis', character: 'M3GAN (voice)' },
                { id: 3444018, name: 'Amie Donald', character: 'M3GAN' },
                { id: 2089274, name: 'Jen Van Epps', character: 'Tess' },
                { id: 1071699, name: 'Brian Jordan Alvarez', character: 'Cole' },
                { id: 1319469, name: 'Ronny Chieng', character: 'David Lin' },
                { id: 1023465, name: 'Stephane Garneau-Monten', character: 'Kurt' }
            ]
        })
    })

    afterEach(cleanup)

    it('renders the cast list', async () => {
        const { getByText } = render(<CastList category='movie' id='123' />)

        // Wait for the cast list to be rendered
        const castList = await waitFor(() => getByText('Allison Williams'))

        expect(castList).toBeInTheDocument()
        expect(getByText('Jenna Davis')).toBeInTheDocument()
        expect(getByText('Cady')).toBeInTheDocument()
        expect(getByText('Amie Donald')).toBeInTheDocument()
        expect(getByText('M3GAN')).toBeInTheDocument()
        expect(getByText('Ronny Chieng')).toBeInTheDocument()
        expect(getByText('Kurt')).toBeInTheDocument()
    })

})
