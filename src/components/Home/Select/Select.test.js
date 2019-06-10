import React from 'react';
import {shallow} from 'enzyme';
import Select from './Select';
import pocketsDoc from '../../../PocketsDoc/index'

import {findByTestAttr, checkProps} from '../../../../Ultils/index';



const setUp = (props={}) => {
    const component = shallow(<Select {...props}/>);
    return component;
}

const expectedProps = {
    select: 'A',
    assignedPocket: { title: "GBP", balance: 540, symbol: "£" },
    otherPocket: { title: "USD", balance: 40, symbol: "$" },
    pockets: pocketsDoc,
    selectChangeA: () => {},
    selectChangeB: () => {},
}

describe('Select Component', () => {

    describe('Checking PropTypes', () => {
        it('should not throw a warning', () => {
            const propsError = checkProps(Select, expectedProps);
            expect(propsError).toBeUndefined();
        });
    });


    // describe('Have props', () => {
    
    //     let wrapper;
    //     beforeEach(()=> {
    //         wrapper = setUp(expectedProps);
    //     })

    //     it('should render without errors', () => {
    //         const component = findByTestAttr(wrapper, 'selectComponent');
    //         expect(component.length).toBe(1);
    //     });
        
    // });

    // describe('Have no props', () => {
        
    //     let wrapper;
    //     beforeEach(()=> {
    //         wrapper = setUp();
    //     })

    //     it('should not render', () => {
    //         const component = findByTestAttr(wrapper, 'selectComponent');
    //         expect(component.length).toBe(0);
    //     });
    // });

});