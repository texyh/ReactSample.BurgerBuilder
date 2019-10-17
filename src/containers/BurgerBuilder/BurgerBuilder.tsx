import React, { Component, Fragment, useState, useEffect } from "react";
import Burger, { burgerProps } from "../../components/Burger/Burger";
import {BurgerIngredientType} from '../../components/Burger/BurgerIngredient/BuderIngredient';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/ErrorHandler/withErrorHandler";
import { RouterProps } from "react-router";
import {connect} from 'react-redux';
import { ADD_INGREDIENTS, REMOVE_INGREDIENTS } from "../../store/actions/actionTypes";
import { addIngredient, removeIngredient, initIngredients, initLogoutSaga } from "../../store/actions/burgerBuilder";
import { purchaseInit } from "../../store/actions/order";

export interface Burgerstate {
    purchasing: boolean,
    loading: boolean
}

export type ingredient = {
    [k:string]: number
}

export type BurgerProps = {
    ingredients: ingredient,
    totalPrice: number
    onIngredientAdded?: (ingsname) => void,
    onIngredientRemoved?: (ingsname) =>  void,
    onInitIngredients: () => void,
    onInitPurchase: () => void,
    onInitLogoutSaga: () => void
}

const  BurgerBuilder = props =>  {
    const [purchasing, setPurchasing] = useState(false);
    const [loading, setLoading] = useState(false);

    const updatePurchaseState = (ingredients: ingredient)=>  {
        const sum = Object.keys(ingredients).map(x => {
            return ingredients[x]
        }).reduce((pre, cur) => {
            return pre + cur
        },0);

        return  sum > 0;
    }

    useEffect(() => {
        props.onInitIngredients()
        props.onInitLogoutSaga()
        
    }, [])
    


    const purchaseHandler = () =>  {
        setPurchasing(true)
    }

    const purchaseCancelHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinueHandler = () => {
        // const queryParams =[];
        // for (const key in props.ingredients) {
        //     queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(props.ingredients[key]))
        // }
        // queryParams.push(`price=${props.totalPrice}`)
        // const queryString = queryParams.join('&')
        props.onInitPurchase()
        props.history.push('/checkout');
    }

        const disableInfo = {
            ...props.ingredients
        }
        const canDisAble: {[k: string]: any} = {};

        for (const key in disableInfo) {
            canDisAble[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner/>

        if(props.ingredients) {
            burger = (<Fragment>
                <Burger ingredients={props.ingredients} />
                <BuildControls 
                ingredientsAdded={(type) => props.onIngredientAdded(BurgerIngredientType[type])}
                ingredientRemoved={(type) => props.onIngredientRemoved(BurgerIngredientType[type])}
                disabled={canDisAble}
                purchasable={updatePurchaseState(props.ingredients)}
                price={props.totalPrice}
                ordered={purchaseHandler.bind(this)}
                 />
            </Fragment>)

            orderSummary = <OrderSummary 
             price={props.totalPrice}
            ingredients={props.ingredients}
            purchaseCanceled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            />
        }

        if(loading) {
            orderSummary = <Spinner />
        }

        return(
        <Fragment>
            
            <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
        )
    
}

const mapStateToProps = state => {
    const builderState = state.burgerBuilder;
    console.log(builderState);
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) => dispatch(addIngredient(ingName)),
        onIngredientRemoved: (ingName) => dispatch(removeIngredient(ingName)),
        onInitIngredients: () => dispatch(initIngredients()),
        onInitPurchase: () => dispatch(purchaseInit()),
        onInitLogoutSaga: () => (dispatch(initLogoutSaga()))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

