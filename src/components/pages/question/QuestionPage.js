import { useState } from 'react'
import { Link } from 'react-router-dom'

const QuestionPage = ({ questions }) => {
    const [questionNum, setQuestionNum] = useState(0)
    const question = questions[questionNum]
    return (
      <div id="QuestionPage">
        Question: {question?.question}
        <Link to="/">Cancel</Link>
        {questionNum === questions.length - 1 ? 
            <Link to="/results">Results</Link> :
            <button onClick={() => setQuestionNum(questionNum+1)}>Next</button>
        }
      </div>
    )
}

export default QuestionPage;
