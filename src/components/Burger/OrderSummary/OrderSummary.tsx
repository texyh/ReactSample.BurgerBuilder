import * as React from  'react';
import { ingredient } from '../../../containers/BurgerBuilder/BurgerBuilder';
import Button from '../../UI/Button/Button';

export interface OrderSummaryProps {
    ingredients: ingredient
    purchaseCanceled: () => void;
    purchaseContinued: () => void;
    price: number

}

export default class OrderSummary extends React.Component<OrderSummaryProps> {
    
    componentWillUpdate() {
        console.log('Order summary will update')
    }

    render() {
        const ingredientSummary = Object.keys(this.props.ingredients)
        .map(x => <li key={x}><span style={{textTransform: "capitalize"}}>{x}</span>: {this.props.ingredients[x]}</li>)

        return <React.Fragment>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>
            {ingredientSummary}
        </ul>
        <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
        <p>Continue to checkout</p>
        <Button clicked={this.props.purchaseCanceled} btnType="Danger">CANCEL</Button>
        <Button clicked={this.props.purchaseContinued} btnType="Success">Continue</Button>
    </React.Fragment>

    }
    

}
