import React from 'react';
import ReactDOM from 'react-dom';
import HighScores from './HighScores'
import { BrowserRouter } from 'react-router-dom'

describe('HighScores component', () => {
    
    it('Renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><HighScores/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
      
})