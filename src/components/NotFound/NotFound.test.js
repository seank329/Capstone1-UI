import React from 'react';
import ReactDOM from 'react-dom';
import NotFound from './NotFound'
import { BrowserRouter } from 'react-router-dom'

describe('NotFound component', () => {
    
    it('Renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><NotFound/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
      
})