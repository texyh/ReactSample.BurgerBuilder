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
 
const Checkout =  (props: CheckoutProps) =>  {
    // state = { 
    //     ingredients: null,
    //     price: 0
    //   }

    const checkoutCanceledHandler = () => {
        props.history.goBack();
    }


    const checkoutContinuedHandler = () => {
        props.history.replace('/checkout/contact-data')
    }

        let summary = <Redirect to="/" />
        if(props.ingredients) {
            const purchasedRedirect = props.purchased ? <Redirect to="/"/> : null;
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                    checkoutCancelled={checkoutCanceledHandler}
                    checkoutContinued={checkoutContinuedHandler}
                    ingredients={props.ingredients} />
                    <Route  
                        path={props.match.path + '/contact-data'} 
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
 
const mapStateToProps = (state: rootState): stateProps => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);