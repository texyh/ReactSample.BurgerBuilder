import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios';

export const purchaseOrderSuccess = (payload) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        payload
    }
}

export const purchaseOrderFailure = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAILURE,
        error
    }
}

export const purchaseBurger = (payload) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', payload)
        .then(response => {
            console.log(response.data);
            dispatch(purchaseOrderSuccess(
                {
                    ...payload,
                    id: response.data.name
                }
                ))
        }).catch(e => {
            dispatch(purchaseOrderFailure(e))
        });
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

export const fetchOrdersSuccess = (orders) => {
    return  {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        payload: orders
    }
}

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrderfail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        payload: error
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart())
        axios.get('/orders.json')
        .then(res => {
            let orders = []
            for(let key in res.data) {
                orders.push({...res.data[key], id: key});
            }
            dispatch(fetchOrdersSuccess(orders))
        }).catch(err => dispatch(fetchOrderfail(err)))
    }
};