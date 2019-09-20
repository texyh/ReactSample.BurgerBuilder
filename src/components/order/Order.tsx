
import * as React from 'react';
import classes from './Order.module.css';
import { ingredient } from '../../containers/BurgerBuilder/BurgerBuilder';
export interface orderProps {
    ingredients: ingredient,
    price: number
}
 
const order: React.SFC<orderProps> = (props) => {

    const ingredients = [];
    for (let name in props.ingredients) {
        ingredients.push({name, amount: props.ingredients[name]})
    }
    const ingredientOutPut = ingredients.map((x, i) => {
        return <span 
        style={{
            display: "inline-block",
            margin: '0 8px',
            border: '1px solid #ccc',
            padding: '5px'
        }}
        key={i}>{x.name} ({x.amount})</span>
    })
    return ( 
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutPut}</p>
            <p>Price: <strong>USD {props.price}</strong></p>
        </div>
     );
}
 
export default order;