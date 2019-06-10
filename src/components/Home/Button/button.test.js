import React from 'react';
import {shallow} from 'enzyme';
import Button from './button';

import {findByTestAttr, checkProps} from '../../../../Ultils/index';



const setUp = (props={}) => {
    const component = shallow(<Button {...props}/>);
    return component;
}


describe('Button Component', () => {

    describe('Checking PropTypes', () => {
        it('should not throw a warning', () => {
            const expectedProps = {
                buttonTitle: 'Test Header',
                classGroup: ['Test 1', 'Test 2'],
            }

            const propsError = checkProps(Button, expectedProps);
            expect(propsError).toBeUndefined();
        });
    });


    describe('Have props', () => {
    
        let wrapper;
        beforeEach(()=> {
            const props = {
                buttonTitle: 'Test Button',
                classGroup: ['Test 1', 'Test 2'],
            }
            wrapper = setUp(props);
        })

        it('should render without errors', () => {
            const component = findByTestAttr(wrapper, 'buttonComponent');
            expect(component.length).toBe(1);
        });
        it('should render button', () => {
            const component = findByTestAttr(wrapper, 'buttonRender');
            expect(component.length).toBe(1);
        });
    });

    describe('Have no props', () => {
        
        let wrapper;
        beforeEach(()=> {
            wrapper = setUp();
        })

        it('should not render', () => {
            const component = findByTestAttr(wrapper, 'buttonComponent');
            expect(component.length).toBe(0);
        });
    });

});