import { GET_POCKETS, POCKET_CLICKED, SET_EXCHANGERATE, SELECT_CHANGE_B, SELECT_CHANGE_A, EXCHANGE_CLICKED, GO_BACK } from '../actions/types';

const initialState = {
    pockets: [],
    rates: {},
    showRates: false,
    selectedPocket: '',
    nextPocket: '',
    exchangeRate: ''
}


export default function (state = initialState, action) {
    switch (action.type) {
        case GET_POCKETS:
            return {
                ...state,
                pockets: action.payload
            }

        case POCKET_CLICKED:
            const { rates, showRates, selectedPocket, nextPocket } = action.payload;
            return {
                ...state, rates, showRates, selectedPocket, nextPocket
            }
        case SET_EXCHANGERATE:
            return {
                ...state,
                exchangeRate: action.payload
            }
        case SELECT_CHANGE_A:
            return {
                ...state,
                selectedPocket: action.payload.selectedPocket,
                nextPocket: action.payload.nextPocket,
                rates: action.payload.rates,
            }
        case SELECT_CHANGE_B:
            return {
                ...state,
                selectedPocket: action.payload.selectedPocket,
                nextPocket: action.payload.nextPocket,
                rates: action.payload.rates
            }
        case EXCHANGE_CLICKED:
            return {
                ...state,
                selectedPocket: action.payload.selectedPocket,
                nextPocket: action.payload.nextPocket
            }
        case GO_BACK:
            return {
                ...state,
                showRates: action.payload.showRates
            }
        default:
            return state
    }
}