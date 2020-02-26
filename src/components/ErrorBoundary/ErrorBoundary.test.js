import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ErrorBoundary from './ErrorBoundary';

describe ('ErrorBoundary component', () => {

    it('Renders without crashing', () => {
        const wrapper = shallow(<ErrorBoundary />)
        wrapper.setState({hasError:true})
        setTimeout(() =>{
            expect(toJson(wrapper)).toMatchSnapshot()
        },500);
    });
});