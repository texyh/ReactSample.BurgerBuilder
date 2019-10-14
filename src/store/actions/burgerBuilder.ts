import * as actionTypes  from './actionTypes';
import  axios from '../../axios';

export const addIngredient = (payload) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        payload
    }
}

export const removeIngredient = (payload) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        payload
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        payload: ingredients
    }
}

export const initLogoutSaga = () => {
    return {
        type: actionTypes.INITIAL_LOGOUT_SAGA,
        payload: "This is the payload for the saga"
    }
}

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return {
        type : actionTypes.INIT_INGREDIENTS
    }
}