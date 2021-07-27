import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './QuestionPage.css';

const QuestionPage = ({ questions, initQuestionNum }) => {
  const history = useHistory();
  const [responses, setResponses] = useState([]);
  const [questionNum, setQuestionNum] = useState(initQuestionNum);
  const question = questions[questionNum];

  const onResponse = (response) => {
    const updatedResponses = [...responses, ...[response]];
    if (questionNum === questions.length - 1) {
      history.push(`/results?responses=${updatedResponses}`);
    } else {
      setResponses(updatedResponses);
      setQuestionNum(questionNum + 1);
    }
  };

  if (!question) return null;

  return (
    <div id="QuestionPage">
      <h1>{question.category}</h1>
      <div id="questionBox">
        <p>{question.question}</p>
      </div>
      <div className="pvl">{`${questionNum + 1} of ${questions.length}`}</div>
      <div id="responseOptions">
        <button type="button" className="box-btn" onClick={() => onResponse('True')}>True</button>
        <button type="button" className="box-btn" onClick={() => onResponse('False')}>False</button>
      </div>
    </div>
  );
};

QuestionPage.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
  initQuestionNum: PropTypes.number, // for testing purposes
};

QuestionPage.defaultProps = {
  initQuestionNum: 0,
};

export default QuestionPage;
