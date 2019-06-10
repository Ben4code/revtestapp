import {combineReducers} from 'redux'
import pocketsReducer from './pockets_reducer';
import errorReducer from './error_reducer'

export default combineReducers({
    pockets: pocketsReducer,
    errors: errorReducer
}) 