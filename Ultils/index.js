import CheckPropTypes from 'check-prop-types';
import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../src/reducers/index';
import {middleware} from '../src/store'

export const findByTestAttr = (component, attr) => {
    const wrapper = component.find(`[data-test='${attr}']`);
    return wrapper;
}


export const checkProps = (component, expectedProps) => {
    const propsErr = CheckPropTypes(component.CheckPropTypes, expectedProps, 'props', component.name);
    return propsErr;
} 

export const testStore = (initialState) => {
    const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);
    return createStoreWithMiddleware(rootReducer, initialState);
}