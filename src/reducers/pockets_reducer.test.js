import { GET_POCKETS } from '../actions/types';
import {pocketsDoc} from '../PocketsDoc/index';
import pocketReducer from './pockets_reducer'

describe('Pocket Reducer', () => {
    const initialState = {
        pockets: [],
        rates: {},
        showRates: false,
        selectedPocket: '',
        nextPocket: '',
        exchangeRate: ''
    }
    
    it('should return default state', () => {
        const newState = pocketReducer(undefined, {});
        expect(newState).toEqual(initialState);
    });
    
    it('should return new state if receiving type', () => {
        const newState = pocketReducer(undefined, {
            type: GET_POCKETS,
            payload: pocketsDoc
        });
        expect(newState.pockets).toEqual(pocketsDoc);
    });
});