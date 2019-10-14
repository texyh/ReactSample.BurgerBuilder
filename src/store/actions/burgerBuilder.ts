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

export const fetchIngredientFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://burger-builder-c1aad.firebaseio.com/ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            }).catch(err => {
                dispatch(fetchIngredientFailed())
            })
        
    }
}