import * as actionTypes from './actions';
import { Reducer } from 'react';
import { ingredient } from '../containers/BurgerBuilder/BurgerBuilder';

export type State = {
    ingredients: ingredient,
    totalPrice: number
}

export type ActionTypes = {
    type: any,
    payload?: any
}
const initialState: State = {
    ingredients: {
        Salad: 0,
        Bacon: 0,
        Cheese: 0,
        Meat: 0
    },
    totalPrice: 5,
};


const INGREDIENT_PRICES: {[k: string]: number} = {
    Salad: 0.5,
    Cheese: 0.4,
    Meat: 1.3,
    Bacon: 0.7
}

const reducer: Reducer<State, ActionTypes> = (state = initialState, action): State => {
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.payload] : state.ingredients[action.payload] + 1
                },
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
    }

    return state
}

export default reducer