import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import {BurgerIngredientType} from '../../components/Burger/BurgerIngredient/BuderIngredient';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
export interface Burgerstate {
    ingredients: ingredient,
    totalPrice: number,
    purchaseable: boolean,
    purchasing: boolean
}

export type ingredient = {
    [k:string]: number
}


const INGREDIENT_PRICES: {[k: string]: number} = {
    Salad: 0.5,
    Cheese: 0.4,
    Meat: 1.3,
    Bacon: 0.7
}

class BurgerBuilder extends Component<{}, Burgerstate> {

    state: Burgerstate = {
        ingredients: {
            Salad: 0,
            Bacon: 0,
            Cheese: 0,
            Meat: 0
        },
        totalPrice: 5,
        purchaseable: false,
        purchasing: false
    }

    updatePurchaseState(ingredients: ingredient) {
        const sum = Object.keys(ingredients).map(x => {
            return ingredients[x]
        }).reduce((pre, cur) => {
            return pre + cur
        },0);

        this.setState({purchaseable: sum > 0});

    }

    addIngredientHandler = (type: BurgerIngredientType) => {
        const updatedIngredients = {...this.state.ingredients}
        let updatedIngrendient = updatedIngredients[BurgerIngredientType[type]];
        updatedIngrendient++
        updatedIngredients[BurgerIngredientType[type]] = updatedIngrendient
        const priceAddition = INGREDIENT_PRICES[BurgerIngredientType[type]];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler() {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert('You continue');
    }

    removeIngredientHandler = (type: BurgerIngredientType) => {
        const ingredientType = BurgerIngredientType[type];
        let ingredientcount = this.state.ingredients[ingredientType]
        if(ingredientcount <= 0) {
            return
        }
        const updatedIngredients = {...this.state.ingredients};
        let updatedIngrendient = updatedIngredients[ingredientType]
        updatedIngrendient--
        updatedIngredients[ingredientType] = updatedIngrendient
        const priceSubst = INGREDIENT_PRICES[ingredientType];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceSubst;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    render() {
        const disableInfo = {
            ...this.state.ingredients
        }
        const canDisAble: {[k: string]: any} = {};

        for (const key in disableInfo) {
            canDisAble[key] = disableInfo[key] <= 0
        }

        return(
        <Fragment>
            <Burger ingredients={this.state.ingredients} />
            <BuildControls 
            ingredientsAdded={this.addIngredientHandler}
            ingredientRemoved={this.removeIngredientHandler}
            disabled={canDisAble}
            purchasable={this.state.purchaseable}
            price={this.state.totalPrice}
            ordered={this.purchaseHandler.bind(this)}
             />
            <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
            <OrderSummary 
                price={this.state.totalPrice}
                ingredients={this.state.ingredients}
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                />
            </Modal>
            
        </Fragment>
        )
    }
}

export default BurgerBuilder

