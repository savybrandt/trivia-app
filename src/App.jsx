/* @flow */
import React, { useState } from 'react';
import type { Node } from 'react';
import useAxios from 'axios-hooks';
import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import { reduceQuestionsPayload } from './helpers';
import type { Question } from './types';
import { IntroPage, QuestionPage, ResultsPage } from './components/pages';

type TriviaAppProps = {
  questions: Array<Question>
}

const TriviaApp = React.memo((props: TriviaAppProps) => {
  const { questions } = props;
  return (
    <Router>
      <Switch>
        <Route path="/questions">
          <QuestionPage questions={questions} />
        </Route>
        <Route path="/results">
          <ResultsPage questions={questions} />
        </Route>
        <Route exact path="/">
          <IntroPage />
        </Route>
      </Switch>
    </Router>
  );
});

const questionsPath = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';

const Loader = () => <h1>Loading...</h1>;

function App(): Node {
  const [questions, setQuestions] = useState();
  const [{ data, error }] = useAxios(questionsPath);

  if (!questions && data) {
    setQuestions(reduceQuestionsPayload(data.results));
  }

  if (error) {
    throw new Error(error);
  }

  if (questions) {
    return (
      <TriviaApp questions={questions} />
    );
  }

  return <Loader />;
}

export default App;
