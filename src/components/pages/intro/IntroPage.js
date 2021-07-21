import { Link } from 'react-router-dom'

const IntroPage = () => (
    <div id="IntroPage">
        <h1>Welcome to the Trivia Challenge!</h1>
        <p>You will be presented with 10 True or False Questions</p>
        <p>Can you score 100%?</p>
        <Link to="questions">BEGIN</Link>
    </div>
)

export default IntroPage;
