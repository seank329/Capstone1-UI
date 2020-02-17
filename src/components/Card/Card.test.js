import React from 'react';
import ReactDOM from 'react-dom';
import Card from './Card'

describe ('Card component', () => {

    it('Renders without crashing', () => {
        const div = document.createElement('div');
        const notInPlay=[1,2,3,4,5]
        const newId=4
        const image1={'id':5}
        const inPlay=[{'image':1},{'image':2},{'image':3},{'image':4},{'image':5}]
        ReactDOM.render(
             <Card notInPlay={notInPlay} id={newId} image1={image1} inPlay={inPlay}/>
           , div
        )
        ReactDOM.unmountComponentAtNode(div);
    })
})