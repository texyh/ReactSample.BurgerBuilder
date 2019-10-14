import logoutSaga from "./auth";

import {takeEvery, all, takeLatest} from 'redux-saga/effects';
import { INITIAL_LOGOUT_SAGA, INIT_INGREDIENTS, PURCHASE_BURGER, FETCH_ORDER_INIT } from "../actions/actionTypes";
import {getIngredientSaga} from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrders } from "./order";
import { fetchIngredientFailed } from "../actions/burgerBuilder";

export  function* watchAuth() {
    yield takeEvery(INITIAL_LOGOUT_SAGA, logoutSaga)
}

export function* watchBurgerBuilder() {
    yield takeEvery(INIT_INGREDIENTS, getIngredientSaga)
}

export function* watchOrder() {
    // yield all([
    //     takeLatest(PURCHASE_BURGER, purchaseBurgerSaga),
    //     takeEvery(FETCH_ORDER_INIT, fetchOrders)
    // ])

    yield takeEvery(PURCHASE_BURGER, purchaseBurgerSaga);
    yield takeEvery(FETCH_ORDER_INIT, fetchOrders)
    
}