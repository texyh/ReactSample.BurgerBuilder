
import axios from '../../axios';
import {put} from 'redux-saga/effects'
import* as actions from '../actions/burgerBuilder';


export  function* getIngredientSaga(action) {
    try {
        const response = yield axios.get('https://burger-builder-c1aad.firebaseio.com/ingredients.json');
        yield put(actions.setIngredients(response.data))
    } catch (error) {
        yield put(actions.fetchIngredientFailed())
    }
}

