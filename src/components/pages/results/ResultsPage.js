import { Link, useLocation } from 'react-router-dom'

const useQuery = () => new URLSearchParams(useLocation().search)

const isResponseCorrect = (question, response) => question.answer === response

const Result = ({question, response}) => (
    <div>
        <span>{isResponseCorrect(question, response) ? "+" :"-" }</span>
        {question.question}
    </div>
)

const ResultsPage = ({ questions }) => {
    const query = useQuery()
    const responses = query.get('responses').split(',')
    
    return (
    <div id="ResultsPage">
        Results:
        {questions.map((question, idx) => (
            <Result key={question.question} question={question} response={responses[idx]}/>
        ))}
        <Link to="/">PLAY AGAIN?</Link>
    </div>
    )
}

export default ResultsPage;
