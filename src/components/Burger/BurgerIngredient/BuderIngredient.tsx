import React, { FC, Component } from "react";
import classes from './BurgerIngredient.module.css';
import PropTypes from 'prop-types';
import BurgerBuilder from "../../../containers/BurgerBuilder/BurgerBuilder";

class BurgerIngredient extends Component<BurgerIngredientProps>  {

    render() {
        let ingredient = null;

    switch(this.props.type) {
        case (BurgerIngredientType.BreadBottom):
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case(BurgerIngredientType.BreadTop):
            ingredient = (
                <div className={classes.BreadTop}>
                    <div className={classes.Seed1}></div>
                    <div className={classes.Seed2}></div>

                </div>
            )
            break;

        case(BurgerIngredientType.Meat):
            ingredient = <div className={classes.Meat}></div>
            break

        case(BurgerIngredientType.Cheese):
            ingredient = <div className={classes.Cheese}></div>
            break

        case(BurgerIngredientType.Bacon):
            ingredient = <div className={classes.Bacon}></div>
            break

        case(BurgerIngredientType.Salad):
            ingredient = <div className={classes.Salad}></div>
            break;
        
        default:
            ingredient = null;
        
    }

    return ingredient;
    }
    
}
export interface BurgerIngredientProps {
    type: BurgerIngredientType
}

export enum BurgerIngredientType {
    BreadBottom,
    BreadTop,
    Meat,
    Cheese,
    Bacon,
    Salad
}

export default BurgerIngredient;

