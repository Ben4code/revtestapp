import {GET_ERRORS, CLEAR_ERRORS} from '../actions/types'

const initialState = {
    error: false
}

export default function(state = initialState, action){
    
    switch (action.type) {
        case GET_ERRORS:
            return {
                ...state,
                error: action.payload.error
            }
        case CLEAR_ERRORS:
                return {
                    ...state,
                    error: action.payload.error
                }
        default:
            return state
    }

}