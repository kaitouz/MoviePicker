import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MovieFrame from './MovieFrame';
import '@testing-library/jest-dom'

describe('MovieFrame component', () => {
  test('it renders the component', () => {
    const { getByText } = render(<MovieFrame id="test-frame" />);
    const frame = getByText('X');
    expect(frame).toBeInTheDocument();
  });

  test('it calls the onClose prop when the close button is clicked', () => {
    const onCloseMock = jest.fn();
    const { getByText } = render(<MovieFrame id="test-frame" onClose={onCloseMock} />);
    const closeBtn = getByText('X');
    fireEvent.click(closeBtn);
    expect(onCloseMock).toHaveBeenCalled();
  });

  test('it renders the children passed to it', () => {
    const { getByText } = render(
      <MovieFrame id="test-frame">
        <p>Test content</p>
      </MovieFrame>
    );
    const content = getByText('Test content');
    expect(content).toBeInTheDocument();
  });
});
