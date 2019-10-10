import * as React from 'react';
import CheckoutSummary from '../../components/order/checkoutSummary/CheckoutSummary';
import { RouterProps, RouteComponentProps, Route } from 'react-router';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { ingredient } from '../BurgerBuilder/BurgerBuilder';

export interface CheckoutProps extends RouterProps, RouteComponentProps {
    ingredients: ingredient,
    totalPrice: number

}
 
export interface CheckoutState {
    
}
 
class Checkout extends React.Component<CheckoutProps, CheckoutState> {
    // state = { 
    //     ingredients: null,
    //     price: 0
    //   }

    checkoutCanceledHandler = () => {
        this.props.history.goBack();
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
                ingredients={this.props.ingredients} />
                
                <Route  
                path={this.props.match.path + '/contact-data'} 
                component={ContactData} />} /> 
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}
export default connect(mapStateToProps)(Checkout);