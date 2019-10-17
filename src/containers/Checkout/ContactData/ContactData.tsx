import * as React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import { ingredient } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter, RouteComponentProps, Redirect } from 'react-router';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../hoc/ErrorHandler/withErrorHandler';
import { purchaseBurger } from '../../../store/actions/order';

export interface ContactDataProps extends RouteComponentProps {
    ingredients: ingredient,
    price: number,
    onOrderburger(data): void
    loading: boolean
}
 
export interface ContactDataState {
    
}
 
const ContactData = props => {

    const [orderForm, setOrderForm] =  React.useState({
        name: '',
        street: '',
        zipcode: 234,
        country: 'Nigeria',
        email: '',
        deliveryMethod: 'fastest'
    })
    
    const orderHandler = (e) => {
        e.preventDefault()
        const formData = orderForm
        const order = {
            ingredients: props.ingredients,
            price: props.price.toFixed(2),
            orderData: formData
        }
        props.onOrderburger(order);
    }

    const changeHandler = (event, element) => {
        const updatedOrderForm = {
            ...orderForm
        }
        updatedOrderForm[element] = event.target.value;
        setOrderForm(updatedOrderForm)
    }

        let form = (<div>
            <h4>Enter your Contact Data</h4>
                <form onSubmit={(x) => orderHandler(x)}>
                    <Input  
                            type="text" 
                            name="name" 
                            placeholder="Your name" 
                            value={orderForm.name} 
                            change={(event) => changeHandler(event, 'name')} />

                    <Input  
                            type="email" 
                            name="email" 
                            placeholder="Your email" 
                            value={orderForm.email}
                            change={(event) => changeHandler(event, 'email')}/>

                    <Input  
                            type="text" 
                            name="street" 
                            placeholder="Street" 
                            value={orderForm.street}
                            change={(event) => changeHandler(event, 'street')} />

                    <Input  
                            type="text" 
                            name="postal" 
                            placeholder="postal code" 
                            value={orderForm.zipcode}
                            change={(event) => changeHandler(event, 'zip')}
                            />

                    <Button btnType="Success">Order</Button>
                </form>
        </div>
            );
        if(props.loading) {
            form = <Spinner/>
        }
        return ( 
            <div className={classes.ContactData}>
                {form}
            </div>
         );
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderburger: (data) =>  dispatch(purchaseBurger(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler((withRouter((ContactData))), axios));