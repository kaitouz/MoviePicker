import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom'
import CommentCard from './CommentCard';

describe('CommentCard', () => {
  it('renders the avatar, username, role, and time of the comment', () => {
    const item = {
      id: 1,
      user_name: 'John Doe',
      role: 'admin',
      time: new Date(),
      avatar: 'image.png'
    }

    const { getByText } = render(<CommentCard item={item} />);

    expect(getByText('John Doe')).toBeInTheDocument();
    expect(getByText('admin')).toBeInTheDocument();
  });

});
