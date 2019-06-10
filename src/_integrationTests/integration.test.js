import moxios from 'moxios';
import pocketDoc from '../PocketsDoc/index';
import {testStore} from '../../Ultils/index';
import {getPockets} from './../actions/pocketsActions';



describe('Get pockets actions', () => {
    
    it('Store is updated correctly', () => {
        const expectedState = pocketDoc;
        const store = testStore();
        const newState = store.getState;
        expect(newState.pockets).toBe(expectedState);
    })
});