import React from 'react';
import ReactDOM from 'react-dom';
import PlayerStats from './PlayerStats'
import { BrowserRouter } from 'react-router-dom'

describe('PlayerStats component', () => {
    
    it('Renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><PlayerStats/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
      
})