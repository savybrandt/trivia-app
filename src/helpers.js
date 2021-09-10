/* @flow */
/* eslint-disable import/prefer-default-export */
import { decode } from 'he';
import type { Question } from './types';

function reduceQuestionsPayload(questions: Array<{
  category: string,
  correct_answer: string,
  question: string
}>): Array<Question> {
  return (
    questions.map((question) => ({
      category: question.category,
      answer: question.correct_answer,
      question: decode(question.question),
    }))
  );
}

export { reduceQuestionsPayload };
