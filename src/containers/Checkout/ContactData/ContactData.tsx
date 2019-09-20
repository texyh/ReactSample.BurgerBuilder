import * as React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import { ingredient } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter, RouteComponentProps } from 'react-router';

export interface ContactDataProps extends RouteComponentProps {
    ingredients: ingredient,
    price: number
}
 
export interface ContactDataState {
    
}
 
class ContactData extends React.Component<ContactDataProps, ContactDataState> {
    state = { 
        name: '',
        email: '',
        address: {
            street: '',
            postalcode: ''
        },
        loading: false
      }

    orderHandler = (e) => {
        e.preventDefault()
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            customer: {
                name: 'emeka',
                address: {
                    street: 'adeneka',
                    zipcode: 234,
                    country: 'Nigeria'
                },
                email: 'test@gmail.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            console.log(response);
            this.setState({loading: false})
            this.props.history.push('/')
        }).catch(x => this.setState({loading: false}));
    }

    render() { 
        let form = (<div>
            <h4>Enter your Contact Data</h4>
                <form>
                    <input type="text" name="name" placeholder="Your name"/>
                    <input type="email" name="email" placeholder="Your email"/>
                    <input type="text" name="street" placeholder="Street"/>
                    <input type="text" name="postal" placeholder="postal code"/>
                    <Button clicked={(x) => this.orderHandler(x)} btnType="Success">Order</Button>
                </form>
        </div>
            );
        if(this.state.loading) {
            form = <Spinner/>
        }
        return ( 
            <div className={classes.ContactData}>
                {form}
            </div>
         );
    }
}
 
export default withRouter(ContactData);