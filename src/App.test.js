import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('axios-hooks');
jest.mock('./helpers');

const helpers = require('./helpers');
const useAxios = require('axios-hooks');

describe('App', () => {
  const questions = [
    { category: 'foo', question: 'foo&bar', answer: 'bar' },
  ];
  
  const errorPayload = [{ data: undefined, loading: false, error: 'oops!' }]
  const loadingPayload = [{ data: undefined, loading: true, error: undefined }]
  const resolvedPayload = [{ data: {results: [questions]}, loading: false, error: undefined }]

  test('makes a call to the questions endpoint', () => {
    useAxios.default.mockReturnValue(loadingPayload);
    render(<App />);
    expect(useAxios.default).toHaveBeenCalled();
  });

  test('renders "Loading..." when payload is not yet returned', () => {
    useAxios.default.mockReturnValue(loadingPayload);
    render(<App />);
    const loadingElement = screen.getByText('Loading...');
    expect(loadingElement).toBeInTheDocument();
  });

  test('throws an error if present', () => {
    useAxios.default.mockReturnValue(errorPayload);
    expect(() => render(<App />)).toThrow('oops!')
  });

  test('renders the IntroPage if data is present', () => {
    useAxios.default.mockReturnValue(resolvedPayload);
    helpers.reduceQuestionsPayload.mockReturnValue(questions);

    render(<App />);
    const IntroPage = screen.getByText("Welcome to the Trivia Challenge!");
    expect(IntroPage).toBeInTheDocument();
  });
});
