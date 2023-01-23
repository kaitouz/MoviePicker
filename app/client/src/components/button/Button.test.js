import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import Button from './Button';

describe('Button', () => {
  it('renders the name prop as its text', () => {
    const { getByText } = render(<Button name="Click me" />);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls the onClick prop when clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button name="Click me" onClick={onClick} />);
    fireEvent.click(getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});
