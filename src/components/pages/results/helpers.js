import { useLocation } from 'react-router-dom';

export const useQuery = () => new URLSearchParams(useLocation().search);

export const isResponseCorrect = (question, response) => question.answer === response;

export const getScore = (questions, responses) => {
  let correctCount = 0;
  questions.forEach((question, index) => {
    if (isResponseCorrect(question, responses[index])) {
      correctCount += 1;
    }
  });
  return `${correctCount} / ${questions.length}`;
};
