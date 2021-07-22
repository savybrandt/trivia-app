import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ResultsPage.css';
import {
  useQuery,
  getScore,
  isResponseCorrect,
} from './helpers';

const Result = ({ question, response }) => {
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
};

Result.propTypes = {
  question: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
  }).isRequired,
  response: PropTypes.string.isRequired,
};

const ResultsPage = ({ questions }) => {
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

ResultsPage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
};

export default ResultsPage;
