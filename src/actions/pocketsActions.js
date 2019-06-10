import { GET_POCKETS, POCKET_CLICKED, GET_ERRORS, SET_EXCHANGERATE, SELECT_CHANGE_A, SELECT_CHANGE_B, EXCHANGE_CLICKED, GO_BACK, CLEAR_ERRORS} from './types';
import { pocketsDoc } from '../PocketsDoc/index'
import axios from 'axios';


export const getPockets = () => {
    return {
        type: GET_POCKETS,
        payload: pocketsDoc
    }
}

export const pocketClicked = (pocket, pockets) => dispatch => {
    const nextPocket = pockets.filter(item => {
        return item.title !== pocket.title;
    })[0];

    axios.get(`https://api.exchangeratesapi.io/latest?base=${pocket.title}`)
        .then(res => {
            dispatch({
                type: POCKET_CLICKED,
                payload: {
                    showRates: true,
                    rates: res.data.rates,
                    selectedPocket: pocket,
                    nextPocket: nextPocket,
                }
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    error: err.message
                }
            })
        })
}

export const goBack = () => {
    return {
        type: GO_BACK,
        payload: {showRates: false}
    }
}

export const setExchangeRate = (rates, currency) => {
    const exchangeRate = Object.entries(rates).filter(item => {
        return item[0] === currency;
    })[0];
    console.log("Interval");
    
    return {
        type: SET_EXCHANGERATE,
        payload: exchangeRate
    }
}

export const selectChangeA = (value, otherPocket, pockets) => dispatch => {
    //Fetch full pocket from select value
    const pocketUpdate = pockets.filter(pocket => {
        return pocket.title === value
    })[0];
    //Get rates of selected value
    axios.get(`https://api.exchangeratesapi.io/latest?base=${pocketUpdate.title}`)
        .then(res => {
            //Update exchange rate component
            const xRate = setExchangeRate(res.data.rates, otherPocket.title).payload
            dispatch({
                type: SELECT_CHANGE_A,
                payload: {
                    selectedPocket: pocketUpdate,
                    nextPocket: otherPocket,
                    rates: res.data.rates,
                    exchangeRate: xRate
                }
            })
        })
        .catch(err => {
            console.log(err)
            dispatch({
                type: GET_ERRORS,
                payload: {
                    error: err.message
                }
            })
        });
}

export const selectChangeB = (value, otherPocket, pockets) => dispatch => {
    //Fetch full pocket from select value
    const pocketUpdate = pockets.filter(pocket => {
        return pocket.title === value
    })[0];
    //Get rates of selected value
    axios.get(`https://api.exchangeratesapi.io/latest?base=${pocketUpdate.title}`)
        .then(res => {
            //Update exchange rate component
            const xRate = setExchangeRate(res.data.rates, otherPocket.title).payload
            
            dispatch({
                type: SELECT_CHANGE_B,
                payload: {
                    selectedPocket: otherPocket,
                    nextPocket: pocketUpdate,
                    rates: res.data.rates,
                    exchangeRate: xRate
                }
            })
        })
        .catch(err => {
            dispatch({
                type: GET_ERRORS,
                payload: {
                    error: err.message
                }
            })
        });
}

export const exchangeClicked = (pocketA, pocketB) => {
    return {
        type: EXCHANGE_CLICKED,
        payload: {
            selectedPocket: pocketA,
            nextPocket: pocketB,
        }
    }
}

export const clearError = () => {
    return{
        type: CLEAR_ERRORS,
        payload: {error: false}
    }
}