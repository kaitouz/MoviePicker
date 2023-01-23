import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Header from './Header';
import { useLocation, useNavigate } from 'react-router-dom';

jest.mock('react-router-dom', () => {
  return {
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
  };
});

describe('Header', () => {
  it('renders correctly and displays navigation links', () => {
    useLocation.mockImplementation(() => ({ pathname: '/' }));
    const { getByText } = render(<Header />);

    expect(getByText('Home')).toBeInTheDocument();
    expect(getByText('Movies')).toBeInTheDocument();
    expect(getByText('TV Series')).toBeInTheDocument();
  });

  it('navigates to the correct path when a navigation link is clicked', () => {
    useLocation.mockImplementation(() => ({ pathname: '/' }));
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);
    const { getByText } = render(<Header />);

    fireEvent.click(getByText('Movies'));
    expect(navigate).toHaveBeenCalledWith('/movie');
  });

  it('shrinks the header when the user scrolls down', () => {
    useLocation.mockImplementation(() => ({ pathname: '/' }));
    const { container } = render(<Header />);
    window.scrollTo = jest.fn();
    fireEvent.scroll(window);

    expect(container.firstChild.classList).toContain('shrink');
  });
});
