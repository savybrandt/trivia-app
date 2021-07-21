import { Link, useLocation } from 'react-router-dom'
import './ResultsPage.css';

const useQuery = () => new URLSearchParams(useLocation().search)

const isResponseCorrect = (question, response) => question.answer === response

const getScore = (questions, responses) => {
    let correctCount = 0
    questions.forEach((question, index) => {
        if (isResponseCorrect(question, responses[index])) {
            correctCount = correctCount + 1
        }
    })
    return `${correctCount} / ${questions.length}`
}

const Result = ({question, response}) => {
    const correct = isResponseCorrect(question, response)
    return (
        <li className="resultsListItem">
            <span 
                className={`correctnessIndicator ${correct ? 'plus' : 'minus'}`} 
                aria-label={`Question answered ${correct ? 'correctly:' : 'incorrectly:'}`}
            >
                {correct ? "+" :"-" }
            </span>
            {question.question}
        </li>
    )
}

const ResultsPage = ({ questions }) => {
    const query = useQuery()
    const responses = query.get('responses').split(',')
    
    return (
    <div id="ResultsPage">
        <h1>You scored <br/>{getScore(questions, responses)}</h1>
        <ul id="resultsList">
            {questions.map((question, idx) => (
                <Result key={question.question} question={question} response={responses[idx]}/>
            ))}
        </ul>
        <Link className="footer-link" to="/">PLAY AGAIN?</Link>
    </div>
    )
}

export default ResultsPage;
