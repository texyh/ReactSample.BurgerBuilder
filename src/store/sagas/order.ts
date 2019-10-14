
import {put} from 'redux-saga/effects';
import * as actions from '../actions/order';
import axios from '../../axios';

export function* purchaseBurgerSaga(action) {
    try {
        yield put(actions.purchaseBurgerStart());
        const response  = yield  axios.post('/orders.json', action.payload);
        
        yield put(actions.purchaseOrderSuccess({
            ...action.payload,
            id: response.data.name
        }))
    } catch (error) {
        console.log(error)
        yield put(actions.purchaseOrderFailure(error))
    }
}

export function* fetchOrders(action) {
    try {
        yield put(actions.fetchOrdersStart())
        const response = yield axios.get('/orders.json');
        let orders = []
            for(let key in response.data) {
                orders.push({...response.data[key], id: key});
            }
        yield put(actions.fetchOrdersSuccess(orders))
        
    } catch(error) {
        yield put(actions.fetchOrderfail(error))
    }
}

