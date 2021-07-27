/* eslint-disable react/prop-types */
import React from 'react';
import { render, screen } from '@testing-library/react';
import ResultsPage from './ResultsPage';

jest.mock('./helpers', () => ({
  ...jest.requireActual('./helpers'),
  useQuery: () => ({ get: () => 'True, False' }),
}));

jest.mock('react-router-dom', () => ({
  Link: ({ to, children }) => <a href={to}>{children}</a>,
}));

const questions = [
  { category: 'category0', question: 'question0', answer: 'True' },
  { category: 'category1', question: 'question1', answer: 'True' },
];

describe('ResultsPage', () => {
  beforeEach(() => {
    render(<ResultsPage questions={questions} />);
  });

  test('displays a list item for each question', () => {
    const question0 = screen.getByText('question0');
    const question1 = screen.getByText('question1');
    expect(question0).toBeInTheDocument();
    expect(question1).toBeInTheDocument();
  });

  test('displays a link to the home page', () => {
    const link = screen.getByText('PLAY AGAIN?', { selector: 'a' });
    expect(link).toBeInTheDocument();
  });
});

describe('Result', () => {
  beforeEach(() => {
    render(<ResultsPage questions={questions} />);
  });

  test('displays a + if the response is correct', () => {
    const correctIndicator = screen.getByText('+');
    expect(correctIndicator).toBeInTheDocument();
  });

  test('displays a - if the response is correct', () => {
    const incorrectIndicator = screen.getByText('-');
    expect(incorrectIndicator).toBeInTheDocument();
  });

  test('provides an aria-label for the correctnessIndicator', () => {
    const correctIndicator = screen.getByLabelText('Question answered correctly:');
    const incorrectIndicator = screen.getByLabelText('Question answered incorrectly:');
    expect(correctIndicator).toBeInTheDocument();
    expect(incorrectIndicator).toBeInTheDocument();
  });
});
