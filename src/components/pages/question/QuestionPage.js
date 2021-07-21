import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './QuestionPage.css';

const ResponseOptions = ({ onResponse }) => (
    <div id="ResponseOptions">
        <button className="box-btn" onClick={() => onResponse('True')}>True</button>
        <button className="box-btn" onClick={() => onResponse('False')}>False</button>
    </div>
)

const QuestionPage = ({ questions }) => {
    const history = useHistory()
    const [responses, setResponses] = useState([])
    const [questionNum, setQuestionNum] = useState(0)
    const question = questions[questionNum]
    
    const onRespose = response => {
        const updatedResponses = [...responses, ...[response]]
        if (questionNum === questions.length-1) {
            history.push(`/results?responses=${updatedResponses}`)
        } else {
            setResponses(updatedResponses)
            setQuestionNum(questionNum+1)
        }
    }
    
    return (
      <div id="QuestionPage">
        <h1>{question.category}</h1>
        <div id="questionBox">
            <p>{question?.question}</p>
        </div>
        <div className="pvl">{`${questionNum + 1} of ${questions.length}`}</div>
        <ResponseOptions onResponse={onRespose}/>
      </div>
    )
}

export default QuestionPage;
