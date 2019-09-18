import * as React from  'react';
import { ingredient } from '../../../containers/BurgerBuilder/BurgerBuilder';
import Button from '../../UI/Button/Button';

export interface OrderSummaryProps {
    ingredients: ingredient
    purchaseCanceled: () => void;
    purchaseContinued: () => void;
    price: number

}

const orderSummary: React.FC<OrderSummaryProps> = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
    .map(x => <li key={x}><span style={{textTransform: "capitalize"}}>{x}</span>: {props.ingredients[x]}</li>)

    return <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout</p>
        <Button clicked={props.purchaseCanceled} btnType="Danger">CANCEL</Button>
        <Button clicked={props.purchaseContinued} btnType="Success">Continue</Button>

    </React.Fragment>
}

export default orderSummary;