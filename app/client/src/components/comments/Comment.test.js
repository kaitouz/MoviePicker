import React from 'react';
import { render, waitFor } from '@testing-library/react';
import Comments from './Comments';
import reviewAPI from '../../api/serverAPI/reviewAPI';

jest.mock('../../api/serverAPI/reviewAPI');

jest.mock('react-router-dom', () => {
    return {
      useNavigate: jest.fn(),
    };
  });

describe('Comments component', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    it('should display comments', async () => {
        reviewAPI.getMovieReviews.mockResolvedValue({
            data: [
                { id: '1', content: 'Comment 1' },
                { id: '2', content: 'Comment 2' },
            ],
        });

        const { getAllByText } = render(<Comments id='1' />);
        await waitFor(() => getAllByText('Comment 1'))

        expect(reviewAPI.getMovieReviews).toHaveBeenCalledWith('1');
        expect(getAllByText('Comment 1')).toBeTruthy();
        expect(getAllByText('Comment 2')).toBeTruthy();
    });
})