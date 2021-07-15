import React, { useState } from 'react'
import useAxios from 'axios-hooks'
import './App.css';
import { reduceQuestionsPayload } from './helpers'
import { IntroPage, QuestionPage, ResultsPage } from './components/pages/index.js'
import { 
  Route,
  Switch,
  BrowserRouter as Router,
 } from "react-router-dom"

const questionsPath = 'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean'

const TriviaApp = React.memo(({ questions }) => (
  <Router id="App">
    <Switch>
      <Route path="/questions">
        <QuestionPage questions={questions} />
      </Route>
      <Route path="/results">
        <ResultsPage />
      </Route>
      <Route exact path="/">
        <IntroPage />
      </Route>
    </Switch>
  </Router>
))

const App = () => {
  const [questions, setQuestions] = useState()
  const [{ data, loading, error }] = useAxios(questionsPath)
  
  if (!questions && data) {
    setQuestions(reduceQuestionsPayload(data.results))
  }

  if(error) {
    throw new Error(error)
  }

  if(loading) {
    return (<h1>Loading...</h1>)
  }

  return (
    <TriviaApp questions={questions} />
  )
}

export default App
