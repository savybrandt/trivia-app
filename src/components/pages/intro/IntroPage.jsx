import React from 'react';
import { Link } from 'react-router-dom';
import './IntroPage.css';

const IntroPage = () => (
  <div id="IntroPage">
    <h1>Welcome to the Trivia Challenge!</h1>
    <p className="introText">You will be presented with 10 True or False Questions.</p>
    <p className="introText">Can you score 100%?</p>
    <Link className="footer-link" to="questions">BEGIN</Link>
  </div>
);

export default IntroPage;
