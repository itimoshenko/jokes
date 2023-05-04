import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import JokeList from '../JokeList';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

const jokes = [
  {
    id: '1',
    value: 'Chuck Norris can divide by zero.',
    isFavorite: false,
    icon_url: 'http://example.com/icon',
    url: 'http://example.com/joke',
  },
  {
    id: '2',
    value: 'Chuck Norris counted to infinity. Twice.',
    isFavorite: true,
    icon_url: 'http://example.com/icon',
    url: 'http://example.com/joke',
  },
];

describe('JokeList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the list of jokes', () => {
    render(<JokeList isLoading={false} jokes={jokes} onJokeClick={() => {}} />);
    expect(screen.getByText('Chuck Norris can divide by zero.')).toBeInTheDocument();
    expect(screen.getByText('Chuck Norris counted to infinity. Twice.')).toBeInTheDocument();
  });

  it.skip('calls onJokeClick when a joke is clicked', async () => {
    const onJokeClick = jest.fn();

    render(<JokeList isLoading={false} jokes={jokes} onJokeClick={onJokeClick} />);

    userEvent.click(screen.getByTestId('fav-0'));

    expect(onJokeClick).toHaveBeenCalled();
  });
});
