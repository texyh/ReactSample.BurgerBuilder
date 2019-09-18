import * as React from 'react';
import classes from './Burger.module.css'
import BurgerIngredient, { BurgerIngredientType } from './BurgerIngredient/BuderIngredient'
import BurgerBuilder from '../../containers/BurgerBuilder/BurgerBuilder';

export interface burgerProps {
    ingredients: {[k: string]: number}
}
 
const burger: React.FC<burgerProps> = (props) => {
    let transIngredients = Object.keys(props.ingredients).map((x: string) => {
        
        return [...Array(props.ingredients[x])].map((_, index) => {
            return <BurgerIngredient key={x + index} type={x} />
        })
    }).reduce((pre, cur) => {
        return pre.concat(cur);
    }, []);

    if(transIngredients.length === 0) {
        transIngredients = [<p key="empty">please start adding ingredients</p>]
    }
    return ( 
        <div className={classes.Burger}>
            <BurgerIngredient type={BurgerIngredientType.BreadTop}/>
            {transIngredients}
            <BurgerIngredient type={BurgerIngredientType.BreadBottom}/>

        </div>
     );
}
 
export default burger;