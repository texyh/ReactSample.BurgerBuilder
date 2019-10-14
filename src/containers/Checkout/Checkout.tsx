import * as React from 'react';
import CheckoutSummary from '../../components/order/checkoutSummary/CheckoutSummary';
import { RouterProps, Redirect, RouteComponentProps, Route } from 'react-router';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import { ingredient } from '../BurgerBuilder/BurgerBuilder';
import { rootState } from '../../store/reducers';

export interface CheckoutProps extends RouterProps, RouteComponentProps, stateProps {
    

}

export interface stateProps {
    ingredients: ingredient,
    price: number,
    purchased: boolean
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
        let summary = <Redirect to="/" />
        if(this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    checkoutCancelled={this.checkoutCanceledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}
                    ingredients={this.props.ingredients} />
                    <Route  
                        path={this.props.match.path + '/contact-data'} 
                        component={ContactData} /> 
                </div>

            )
            
        }
        return ( 
            <div>
                {summary}
            </div>
         );
    }
}
 
const mapStateToProps = (state: rootState): stateProps => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);