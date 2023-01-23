import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { useLocation, useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom'

import Footer from './Footer';

jest.mock('react-router-dom', () => {
  return {
    useLocation: jest.fn(),
    useNavigate: jest.fn(),
  };
});

describe('Footer component', () => {
  it('should render the component', () => {
    useLocation.mockImplementation(() => ({ pathname: '/' }));
    const { getByText, getByAltText } = render(<Footer />)
    expect(getByAltText('popcorn')).toBeInTheDocument()
    expect(getByText('Ⓒ2022 POPCORN')).toBeInTheDocument()
  })

  it('should navigate to the home page when logo is clicked', () => {
    useLocation.mockImplementation(() => ({ pathname: '/' }));
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);

    const { getByAltText } = render(<Footer />);
    fireEvent.click(getByAltText('popcorn'));

    expect(navigate).toHaveBeenCalledWith('/');
  });
});
