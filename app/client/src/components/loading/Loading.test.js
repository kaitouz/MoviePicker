import React from 'react'
import { render } from '@testing-library/react'
import Loading from './Loading'

it('Loading component renders children and spinner', () => {
    const { getByText } = render(<Loading>Loading...</Loading>)
    const children = getByText(/Loading.../)

    expect(children).toBeTruthy()
})
