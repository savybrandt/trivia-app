import React from 'react';
import {
  render, screen, fireEvent,
} from '@testing-library/react';
import QuestionPage from './QuestionPage';

const questions = [
  { category: 'category0', question: 'question0', answer: 'True' },
  { category: 'category1', question: 'question1', answer: 'True' },
  { category: 'category2', question: 'question2', answer: 'True' },
];

const mockUseState = jest.fn();

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: (initial) => [initial, mockUseState],
}));

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

describe('QuestionPage', () => {
  describe('display', () => {
    beforeEach(() => {
      render(<QuestionPage questions={questions} />);
    });

    test('displays the category', () => {
      const category = screen.getByText('category0');
      expect(category).toBeInTheDocument();
    });

    test('displays the question', () => {
      const question = screen.getByText('question0');
      expect(question).toBeInTheDocument();
    });

    test('displays the current number question out of the total', () => {
      const counter = screen.getByText('1 of 3');
      expect(counter).toBeInTheDocument();
    });

    test('displays options for True and False', () => {
      const trueButton = screen.getByText('True', { selector: 'button' });
      const falseButton = screen.getByText('False', { selector: 'button' });
      expect(trueButton).toBeInTheDocument();
      expect(falseButton).toBeInTheDocument();
    });
  });

  describe('on user response', () => {
    test('updates the responses', () => {
      render(<QuestionPage questions={questions} />);
      const trueButton = screen.getByText('True', { selector: 'button' });
      fireEvent.click(trueButton);
      expect(mockUseState).toHaveBeenCalledWith(['True']);
    });

    test('updates the question number', () => {
      render(<QuestionPage questions={questions} />);
      const trueButton = screen.getByText('False', { selector: 'button' });
      fireEvent.click(trueButton);
      expect(mockUseState).toHaveBeenCalledWith(1);
    });

    test('navigates to results page if last question', () => {
      render(<QuestionPage questions={questions} initQuestionNum={2} />);
      const trueButton = screen.getByText('True', { selector: 'button' });
      fireEvent.click(trueButton);
      expect(mockHistoryPush).toHaveBeenCalled();
    });
  });
});
