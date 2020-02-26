import React from 'react';
import ReactDOM from 'react-dom';
import NewCharacter from './NewCharacter';
import { BrowserRouter } from 'react-router-dom';

describe('NewCharacter component', () => {
    
    it('Renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><NewCharacter/></BrowserRouter>, div);
        ReactDOM.unmountComponentAtNode(div);
      });
      
});