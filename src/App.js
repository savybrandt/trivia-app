import './App.css';
import { IntroPage, QuestionPage, ResultsPage } from 'components/pages/index'
import { 
  Route,
  Switch,
  BrowserRouter as Router,
 } from "react-router-dom"

const App = () => (
  <Router id="App">
    <Switch>
      <Route path="question/:number">
        <QuestionPage/>
      </Route>
      <Route path="results">
        <ResultsPage />
      </Route>
      <Route path="/">
        <IntroPage />
      </Route>
    </Switch>
  </Router>
)

export default App
