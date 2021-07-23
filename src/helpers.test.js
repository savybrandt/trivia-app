import { reduceQuestionsPayload } from './helpers';

describe('reduceQuestionsPayload', () => {
  const questionsPayload = [
    {
      category: 'foo', question: 'foo&ampbar', correct_answer: 'bar', other_stuff: 'doh',
    },
  ];
  let reducedQuestion;
  beforeAll(() => {
    const reducedQuestions = reduceQuestionsPayload(questionsPayload);
    [reducedQuestion] = reducedQuestions;
  });

  test('returns the questions payload with only the category, question and answer', () => {
    expect(reducedQuestion.category).toBeDefined();
    expect(reducedQuestion.question).toBeDefined();
    expect(reducedQuestion.answer).toBeDefined();
    expect(reducedQuestion.other_stuff).toBeUndefined();
  });

  test('decodes escaped characters in question', () => {
    expect(reducedQuestion.question).toBe('foo&bar');
  });
});
