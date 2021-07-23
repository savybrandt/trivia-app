import {
  getScore,
  isResponseCorrect,
} from './helpers';

const questions = [
  { question: 'Q1', answer: 'True' },
  { question: 'Q2', answer: 'False' },
];
const allCorrectResponses = ['True', 'False'];
const allIncorrectResponses = ['False', 'True'];
const halfCorrectResponses = ['False', 'False'];

describe('getScore', () => {
  let allCorrectScore;
  let allIncorrectScore;
  let halfCorrectScore;

  beforeAll(() => {
    allCorrectScore = getScore(questions, allCorrectResponses);
    allIncorrectScore = getScore(questions, allIncorrectResponses);
    halfCorrectScore = getScore(questions, halfCorrectResponses);
  });

  test('returns a string representing the score', () => {
    expect(allCorrectScore).toBe('2 / 2');
    expect(allIncorrectScore).toBe('0 / 2');
    expect(halfCorrectScore).toBe('1 / 2');
  });

  test('returns a correctly formatted string', () => {
    const pattern = /\d\s\/\s\d/; // x / y
    expect(allCorrectScore).toMatch(pattern);
    expect(allIncorrectScore).toMatch(pattern);
    expect(halfCorrectScore).toMatch(pattern);
  });
});

describe('isResponseCorrect', () => {
  test('returns whether a given response is correct for a given question', () => {
    const question = questions[0];
    const correctResponse = allCorrectResponses[0];
    const incorrectResponse = allIncorrectResponses[0];
    expect(isResponseCorrect(question, correctResponse)).toBe(true);
    expect(isResponseCorrect(question, incorrectResponse)).toBe(false);
  });
});
