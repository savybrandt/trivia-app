import { useState } from 'react'
import { useHistory } from 'react-router-dom'

const ResponseOptions = ({ onResponse }) => (
    <>
        <button onClick={() => onResponse('True')}>True</button>
        <button onClick={() => onResponse('False')}>False</button>
    </>
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
        Question: {question?.question}
        <ResponseOptions onResponse={onRespose}/>
      </div>
    )
}

export default QuestionPage;
