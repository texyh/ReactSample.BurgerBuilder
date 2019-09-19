import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import {BurgerIngredientType} from '../../components/Burger/BurgerIngredient/BuderIngredient';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/ErrorHandler/withErrorHandler";
export interface Burgerstate {
    ingredients: ingredient,
    totalPrice: number,
    purchaseable: boolean,
    purchasing: boolean,
    loading: boolean
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
        ingredients: null,
        totalPrice: 5,
        purchaseable: false,
        purchasing: false,
        loading: false
    }

    updatePurchaseState(ingredients: ingredient) {
        const sum = Object.keys(ingredients).map(x => {
            return ingredients[x]
        }).reduce((pre, cur) => {
            return pre + cur
        },0);

        this.setState({purchaseable: sum > 0});

    }

    componentDidMount() {
        axios.get('https://burger-builder-c1aad.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ingredients: res.data})
            }).catch(err => {})
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
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice.toFixed(2),
            customer: {
                name: 'emeka',
                address: {
                    street: 'adeneka',
                    zipcode: 234,
                    country: 'Nigeria'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            console.log(response);
            this.setState({loading: false, purchasing: false})
        }).catch(x => this.setState({loading: false, purchasing: false}));
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

        let orderSummary = null;
        let burger = <Spinner/>

        if(this.state.ingredients) {
            burger = (<Fragment>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                ingredientsAdded={this.addIngredientHandler}
                ingredientRemoved={this.removeIngredientHandler}
                disabled={canDisAble}
                purchasable={this.state.purchaseable}
                price={this.state.totalPrice}
                ordered={this.purchaseHandler.bind(this)}
                 />
            </Fragment>)

            orderSummary = <OrderSummary 
            price={this.state.totalPrice}
            ingredients={this.state.ingredients}
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
export default withErrorHandler(BurgerBuilder, axios)

