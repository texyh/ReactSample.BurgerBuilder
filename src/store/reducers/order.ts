import * as actionTypes from '../actions/actionTypes'

export interface orderState {
    orders:any[],
    loading: boolean,
    purchased: boolean
}

const initialState: orderState = {
    orders: [],
    loading: false,
    purchased: false
}   

const reducer = (state = initialState, action): orderState => {

    switch(action.type) {
        case actionTypes.PURCHASE_INIT:
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BURGER_START:
            return {
                ...state,
                loading: true
            }
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return {
                ...state,
                loading: false,
                orders: state.orders.concat(action.payload),
                purchased: true
            }

        case actionTypes.PURCHASE_BURGER_FAILURE:
            return {
                ...state,
                loading: false,
            }

        case actionTypes.FETCH_ORDERS_START:
            return {
                ...state,
                loading: true
            }

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload,
                loading: false
            }

        case actionTypes.FETCH_ORDERS_FAIL:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}

export default reducer;