import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import Patrogonia from './Patrogonia';

describe('App', () => {
    it('returns a BrowserRouter with a Route to Patrogonia', () => {
        const subject = shallow(<App />);
        expect(subject.type()).toEqual(BrowserRouter);
        const route = subject.find(Route);
        expect(route.props()).toEqual({
            exact: true,
            path: '/',
            component: Patrogonia,
        });
    });
});
