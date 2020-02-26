import React from 'react';
import ReactDOM from 'react-dom';
import CardMultiplier from './CardMultiplier';

describe ('CardMultiplier component', () => {

    it('Renders without crashing', () => {
        const div = document.createElement('div');
        const arrayofcards = () => {}
        ReactDOM.render(
             <CardMultiplier arrayofcards={arrayofcards} />
           , div
        )
        ReactDOM.unmountComponentAtNode(div);
    });
});