
import { put, call } from 'redux-saga/effects';
import { LOG_OUT_SAGA_CALLLED } from '../actions/actionTypes';
import {delay} from 'redux-saga/effects';

function* logoutSaga(action) {
    console.log(action)
    yield delay(4* 1000)
    // yield call([localStorage, 'removeItem'], "token")
    yield localStorage.removeItem("token")
    yield put({
            type: LOG_OUT_SAGA_CALLLED
        })
}

export default logoutSaga