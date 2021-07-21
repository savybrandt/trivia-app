import React, { useState } from 'react';
import useAxios from 'axios-hooks';
import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import { reduceQuestionsPayload } from './helpers';
import { IntroPage, QuestionPage, ResultsPage } from './components/pages/index.js';

const questionsPath = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';

const TriviaApp = React.memo(({ questions }) => (
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
));

const App = () => {
  const [questions, setQuestions] = useState();
  const [{ data, loading, error }] = useAxios(questionsPath);

  if (!questions && data) {
    setQuestions(reduceQuestionsPayload(data.results));
  }

  if (error) {
    throw new Error(error);
  }

  if (loading) {
    return (<h1>Loading...</h1>);
  }

  return (
    <TriviaApp questions={questions} />
  );
};

export default App;
