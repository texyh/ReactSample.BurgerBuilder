import * as actionTypes from '../actions/actionTypes';
import { Reducer } from 'react';
import { ingredient } from '../../containers/BurgerBuilder/BurgerBuilder';
import { updateObject } from '../utility';

export type burgerBuilderState = {
    ingredients: ingredient | null,
    totalPrice: number
    error: boolean
}

export type ActionTypes = {
    type: any,
    payload?: any
}
const initialState: burgerBuilderState = {
    ingredients: null,
    totalPrice: 5,
    error: false
};


const INGREDIENT_PRICES: {[k: string]: number} = {
    Salad: 0.5,
    Cheese: 0.4,
    Meat: 1.3,
    Bacon: 0.7
}

const reducer: Reducer<burgerBuilderState, ActionTypes> = (state = initialState, action): burgerBuilderState => {
    switch(action.type) {
        
        case actionTypes.ADD_INGREDIENTS:
                const updatedIngredient = {[action.payload] : state.ingredients[action.payload] + 1}
                const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            return {
                ...state,
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload]
            }

        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload] : state.ingredients[action.payload] - 1,
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload]
            }

        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.payload,
                error: false,
                totalPrice: 5
            }

        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
    }

    return state
}

export default reducer