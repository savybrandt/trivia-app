/* @flow */
import React from 'react';
import type { Node } from 'react';
import { Link } from 'react-router-dom';
import './ResultsPage.css';
import {
  useQuery,
  getScore,
  isResponseCorrect,
} from './helpers';

type ResultProps = {
  question: {
    question: string,
    answer: string,
  },
  response: string,
}

function Result({ question, response }: ResultProps): Node {
  const correct = isResponseCorrect(question, response);
  return (
    <li className="resultsListItem">
      <span
        className={`correctnessIndicator ${correct ? 'plus' : 'minus'}`}
        aria-label={`Question answered ${correct ? 'correctly:' : 'incorrectly:'}`}
      >
        {correct ? '+' : '-' }
      </span>
      {question.question}
    </li>
  );
}

type ResultsProps = {
  questions: Array<{
    question: string,
    answer: string,
    category: string,
  }>
}

const ResultsPage = ({ questions }: ResultsProps): Node => {
  const query = useQuery();
  const responses = query.get('responses').split(',');

  if (!responses) return null;

  return (
    <div id="ResultsPage">
      <h1>
        You scored
        <br />
        {getScore(questions, responses)}
      </h1>
      <ul id="resultsList">
        {questions.map((question, idx) => (
          <Result key={question.question} question={question} response={responses[idx]} />
        ))}
      </ul>
      <Link className="footer-link" to="/">PLAY AGAIN?</Link>
    </div>
  );
};

export default ResultsPage;
