/* @flow */
import React, { useState } from 'react';
import type { Node } from 'react';
import { useHistory } from 'react-router-dom';
import './QuestionPage.css';
import type { Question } from '../../../types';

type Props = {
  questions: Array<Question>,
  // eslint-disable-next-line react/require-default-props
  initQuestionNum: number, // for testing purposes
};

function QuestionPage({ questions, initQuestionNum }: Props): Node {
  const history = useHistory();
  const [responses, setResponses] = useState([]);
  const [questionNum, setQuestionNum] = useState(initQuestionNum);
  const question = questions[questionNum];

  const onResponse = (response) => {
    const updatedResponses = [...responses, ...[response]];
    if (questionNum === questions.length - 1) {
      const responseString = JSON.stringify(updatedResponses);
      history.push(`/results?responses=${responseString}`);
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
}

QuestionPage.defaultProps = {
  // eslint-disable-next-line react/default-props-match-prop-types
  initQuestionNum: 0,
};

export default QuestionPage;
