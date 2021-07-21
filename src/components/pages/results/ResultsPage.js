import { Link, useLocation } from 'react-router-dom'

const useQuery = () => new URLSearchParams(useLocation().search)

const isResponseCorrect = (question, response) => question.answer === response

const getScore = (questions, responses) => {
    let correctCount = 0
    questions.forEach((question, index) => {
        if (isResponseCorrect(question, responses[index])) {
            correctCount = correctCount + 1
        }
    })
    return `${correctCount}/${questions.length}`
}

const Result = ({question, response}) => (
    <p>
        <span>{isResponseCorrect(question, response) ? "+" :"-" }</span>
        {question.question}
    </p>
)

const ResultsPage = ({ questions }) => {
    const query = useQuery()
    const responses = query.get('responses').split(',')
    
    return (
    <div id="ResultsPage">
        <h1>You Scored {getScore(questions, responses)}</h1>
        {questions.map((question, idx) => (
            <Result key={question.question} question={question} response={responses[idx]}/>
        ))}
        <Link to="/">PLAY AGAIN?</Link>
    </div>
    )
}

export default ResultsPage;
