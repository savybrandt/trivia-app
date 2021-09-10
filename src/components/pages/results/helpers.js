/* @flow */
import { useLocation } from 'react-router-dom';

function useQuery(): URLSearchParams { return new URLSearchParams(useLocation().search); }

function isResponseCorrect(question: { answer: string }, response: string): boolean {
  return question.answer === response;
}

function getScore(questions: Array<{answer: string}>, responses: Array<string>): string {
  let correctCount = 0;
  questions.forEach((question, index) => {
    if (isResponseCorrect(question, responses[index])) {
      correctCount += 1;
    }
  });
  return `${correctCount} / ${questions.length}`;
}

export {
  useQuery,
  isResponseCorrect,
  getScore,
};
