import React from 'react';
import {shallow} from 'enzyme';
import Pocket from './Pocket';

import {findByTestAttr, checkProps} from '../../../../Ultils/index';



const setUp = (props={}) => {
    const component = shallow(<Pocket {...props}/>);
    return component;
}


describe('Pocket Component', () => {

    describe('Checking PropTypes', () => {
        it('should not throw a warning', () => {
            const expectedProps = {
                pocket: { title: "GBP", balance: 540, symbol: "£" }
            }

            const propsError = checkProps(Pocket, expectedProps);
            expect(propsError).toBeUndefined();
        });
    });


    describe('Have props', () => {
    
        let wrapper;
        beforeEach(()=> {
            const props = {
                pocket: { title: "GBP", balance: 540, symbol: "£" }
            }
            wrapper = setUp(props);
        })

        it('should render without errors', () => {
            const component = findByTestAttr(wrapper, 'pocketComponent');
            expect(component.length).toBe(1);
        });
        it('should render h5', () => {
            const component = findByTestAttr(wrapper, 'pocketTitle');
            expect(component.length).toBe(1);
        });
    });

    describe('Have no props', () => {
        
        let wrapper;
        beforeEach(()=> {
            wrapper = setUp();
        })

        it('should not render', () => {
            const component = findByTestAttr(wrapper, 'pocketComponent');
            expect(component.length).toBe(0);
        });
    });

});