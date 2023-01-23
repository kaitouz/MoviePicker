import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'
import { useNavigate, useParams } from 'react-router-dom';
import Search from './Search';
import { category } from '../../api/tmdbAPI';

jest.mock('react-router-dom', () => {
  return {
    useNavigate: jest.fn(),
    useParams: jest.fn()
  };
});

describe('Search component', () => {
  beforeEach(() => {
    useNavigate.mockImplementation(() => jest.fn());
    useParams.mockImplementation(() => ({category: 'movie'}))
  });
  it('should render input field and search button', () => {
    const { getByPlaceholderText, getByText } = render(<Search />);
    expect(getByPlaceholderText('Enter keyword...')).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
  });
  it('should navigate to the correct path when searching', async () => {
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);
    const { getByPlaceholderText, getByText } = render(<Search />);
    const input = getByPlaceholderText('Enter keyword...');
    const searchButton = getByText('Search');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'test' } });
    });
    await act(async () => {
      fireEvent.click(searchButton);
    });
    expect(navigate).toHaveBeenCalledWith('/movie/search/test');
  });
  it('should navigate to the category page when input is empty', async () => {
    const navigate = jest.fn();
    useNavigate.mockImplementation(() => navigate);
    const { getByPlaceholderText, getByText } = render(<Search />);
    const input = getByPlaceholderText('Enter keyword...');
    const searchButton = getByText('Search');
    await act(async () => {
      fireEvent.change(input, { target: { value: '' } });
    });
    await act(async () => {
      fireEvent.click(searchButton);
    });
    expect(navigate).toHaveBeenCalledWith('/movie');
  });
});
