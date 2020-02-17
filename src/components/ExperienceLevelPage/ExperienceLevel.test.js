import React from 'react';
import ReactDOM from 'react-dom';
import ExperienceLevel from './ExperienceLevel'

describe ('ExperienceLevel component', () => {
    const div = document.createElement('div');
    it('Renders without crashing', () => {
        ReactDOM.render(
             <ExperienceLevel />, div
        )
        ReactDOM.unmountComponentAtNode(div);
    })
})