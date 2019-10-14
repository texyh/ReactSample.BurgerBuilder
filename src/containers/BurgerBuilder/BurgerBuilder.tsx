import React, { Component, Fragment } from "react";
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
import { addIngredient, removeIngredient, initIngredients } from "../../store/actions/burgerBuilder";
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
    onInitPurchase: () => void
}

class BurgerBuilder extends Component<BurgerProps & RouterProps, Burgerstate> {

    state: Burgerstate = {
        purchasing: false,
        loading: false,
    }

    updatePurchaseState(ingredients: ingredient) {
        const sum = Object.keys(ingredients).map(x => {
            return ingredients[x]
        }).reduce((pre, cur) => {
            return pre + cur
        },0);

        return  sum > 0;

    }

    componentDidMount() {
        // console.log(this.props)
        this.props.onInitIngredients()
    }


    purchaseHandler() {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        // const queryParams =[];
        // for (const key in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.props.ingredients[key]))
        // }
        // queryParams.push(`price=${this.props.totalPrice}`)
        // const queryString = queryParams.join('&')
        this.props.onInitPurchase()
        this.props.history.push('/checkout');
    }

    render() {
        const disableInfo = {
            ...this.props.ingredients
        }
        const canDisAble: {[k: string]: any} = {};

        for (const key in disableInfo) {
            canDisAble[key] = disableInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner/>

        if(this.props.ingredients) {
            burger = (<Fragment>
                <Burger ingredients={this.props.ingredients} />
                <BuildControls 
                ingredientsAdded={(type) => this.props.onIngredientAdded(BurgerIngredientType[type])}
                ingredientRemoved={(type) => this.props.onIngredientRemoved(BurgerIngredientType[type])}
                disabled={canDisAble}
                purchasable={this.updatePurchaseState(this.props.ingredients)}
                price={this.props.totalPrice}
                ordered={this.purchaseHandler.bind(this)}
                 />
            </Fragment>)

            orderSummary = <OrderSummary 
             price={this.props.totalPrice}
            ingredients={this.props.ingredients}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            />
        }

        if(this.state.loading) {
            orderSummary = <Spinner />
        }

        return(
        <Fragment>
            
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Fragment>
        )
    }
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
        onInitPurchase: () => dispatch(purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));

