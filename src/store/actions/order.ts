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
    return {
        type: actionTypes.PURCHASE_BURGER,
        payload
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
    return  {
       type: actionTypes.FETCH_ORDER_INIT
    }
};