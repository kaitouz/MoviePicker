import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'
import Bookmark from './Bookmark'

test('bookmark test', () => {
    render(<Bookmark/>)
})