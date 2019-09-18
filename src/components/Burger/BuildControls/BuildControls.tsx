import React from 'react';
import { BurgerIngredientType } from '../BurgerIngredient/BuderIngredient';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl'
const controls = [
    {label: 'Salad', type: BurgerIngredientType.Salad},
    {label: 'Bacon', type: BurgerIngredientType.Bacon},
    {label: 'Cheese', type: BurgerIngredientType.Cheese},
    {label: 'Meat', type: BurgerIngredientType.Meat},

];
export interface BuildControlProps {
    ingredientsAdded: (type: BurgerIngredientType) => void
    ingredientRemoved: (type: BurgerIngredientType) => void 
    disabled: {[k: string]: any}
    price: number
    purchasable: boolean
    ordered: () => void

}

const buildControls = (props: BuildControlProps) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price:  {props.price.toFixed(2)}</p>
            {controls.map(x => <BuildControl 
            added={() => props.ingredientsAdded(x.type)}
            removed={() => props.ingredientRemoved(x.type)}
            key={x.label}
            disabled={props.disabled[BurgerIngredientType[x.type]]}
            label={x.label} />)}

            <button onClick={props.ordered} className={classes.OrderButton}
                    disabled={!props.purchasable}
            >ORDER NOW</button>
        </div>
    )
}

export default buildControls
