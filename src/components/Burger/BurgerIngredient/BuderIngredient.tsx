import React, { Component } from "react";
import classes from './BurgerIngredient.module.css';

export interface BurgerIngredientProps {
    type: BurgerIngredientType | string
}

export enum BurgerIngredientType {
    BreadBottom,
    BreadTop,
    Meat,
    Cheese,
    Bacon,
    Salad
}
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
                    <div className={classes.Seeds1}></div>
                    <div className={classes.Seeds2}></div>

                </div>
            )
            break;

        case(BurgerIngredientType.Meat):
        case('Meat'):
            ingredient = <div className={classes.Meat}></div>
            break

        case(BurgerIngredientType.Cheese):
        case('Cheese'):        
            ingredient = <div className={classes.Cheese}></div>
            break

        case(BurgerIngredientType.Bacon):
        case('Bacon'):
            ingredient = <div className={classes.Bacon}></div>
            break

        case(BurgerIngredientType.Salad):
        case('Salad'):
            ingredient = <div className={classes.Salad}></div>
            break;
        
        default:
            ingredient = null;
        
    }

    return ingredient;
    }
    
}


export default BurgerIngredient;

