import React, { useState } from 'react';
import PropTypes from 'prop-types';
import useAxios from 'axios-hooks';
import './App.css';
import {
  Route,
  Switch,
  BrowserRouter as Router,
} from 'react-router-dom';
import { reduceQuestionsPayload } from './helpers';
import { IntroPage, QuestionPage, ResultsPage } from './components/pages';

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

TriviaApp.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  })).isRequired,
};

const questionsPath = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean';

const Loader = () => <h1>Loading...</h1>

const App = () => {
  const [questions, setQuestions] = useState();
  const [{ data, loading, error }] = useAxios(questionsPath);

  if (!questions && data) {
    setQuestions(reduceQuestionsPayload(data.results));
    return <Loader />
  }

  if (error) {
    throw new Error(error);
  }

  if (loading) {
    return <Loader />
  }

  return (
    <TriviaApp questions={questions} />
  );
};

export default App;
