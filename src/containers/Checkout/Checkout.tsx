import * as React from 'react';
import CheckoutSummary from '../../components/order/checkoutSummary/CheckoutSummary';
import { RouterProps, RouteComponentProps, Route } from 'react-router';
import ContactData from './ContactData/ContactData';

export interface CheckoutProps extends RouterProps, RouteComponentProps {
    
}
 
export interface CheckoutState {
    
}
 
class Checkout extends React.Component<CheckoutProps, CheckoutState> {
    state = { 
        ingredients: null,
        price: 0
      }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
    }

    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search)
        const ingredients = {};
        let price = 0
        query.forEach((v, k) => {
            if(k === "price") {
                price = +v;
                return
            }

            ingredients[k] = +v
        });
        this.setState({ingredients: ingredients, price})
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() { 
        return ( 
            <div>
                <CheckoutSummary 
                checkoutCancelled={this.checkoutCanceledHandler}
                checkoutContinued={this.checkoutContinuedHandler}
                ingredients={this.state.ingredients} />
                
                <Route  path={this.props.match.path + '/contact-data'} render={() => <ContactData ingredients={this.state.ingredients} price={this.state.price} />} /> 
            </div>
         );
    }
}
 
export default Checkout;