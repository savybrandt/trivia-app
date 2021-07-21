import { decode } from 'he';

export const reduceQuestionsPayload = (questions) => (
  questions.map((question) => ({
    category: question.category,
    answer: question.correct_answer,
    question: decode(question.question),
  }))
);
