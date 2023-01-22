import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'
import Button from "./Button"

test('Test button name', () => {
    render(<Button name='Test button'/>)

    const button = screen.getByRole('button', {name: "Test button"})

    expect(button).toBeInTheDocument()
})

test('Test button callback', () => {
    const logSpy = jest.spyOn(console, 'log')

    render(<Button onClick={() => {
        console.log('Test click')
    }}/>)

    const button = screen.getByRole('button')

    fireEvent.click(button)
    expect(logSpy).toHaveBeenCalledWith('Test click')
})