/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen } from '@testing-library/react';
import IntroPage from './IntroPage';

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

describe('IntroPage', () => {
  beforeEach(() => {
    render(<IntroPage />);
  });

  test('displays the headline', () => {
    const headline = screen.getByText('Welcome to the Trivia Challenge!');
    expect(headline).toBeInTheDocument();
  });

  test('displays the intro text', () => {
    const intro1 = screen.getByText('You will be presented with 10 True or False Questions.');
    const intro2 = screen.getByText('Can you score 100%?');
    expect(intro1).toBeInTheDocument();
    expect(intro2).toBeInTheDocument();
  });

  test('displays a link to the question page', () => {
    const link = screen.getByText('BEGIN', { selector: 'a' });
    expect(link).toBeInTheDocument();
  });
});
