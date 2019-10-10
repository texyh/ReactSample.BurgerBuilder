import * as React from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import { ingredient } from '../../BurgerBuilder/BurgerBuilder';
import axios from '../../../axios';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter, RouteComponentProps } from 'react-router';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';

export interface ContactDataProps extends RouteComponentProps {
    ingredients: ingredient,
    price: number
}
 
export interface ContactDataState {
    
}
 
class ContactData extends React.Component<ContactDataProps, ContactDataState> {
    state = { 
        orderForm: {
            name: '',
            street: '',
            zipcode: 234,
            country: 'Nigeria',
            email: '',
            deliveryMethod: 'fastest'
        },
        loading: false
      }

    orderHandler = (e) => {
        e.preventDefault()
        this.setState({loading: true})
        const formData = this.state.orderForm
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price.toFixed(2),
            orderData: formData
        }
        axios.post('/orders.json', order)
        .then(response => {
            console.log(response);
            this.setState({loading: false})
            this.props.history.push('/')
        }).catch(x => this.setState({loading: false}));
    }

    changeHandler = (event, element) => {
        const updatedOrderForm = {
            ...this.state.orderForm
        }


        updatedOrderForm[element] = event.target.value;
        this.setState({
            orderForm : updatedOrderForm
        })
    }

    render() { 
        let form = (<div>
            <h4>Enter your Contact Data</h4>
                <form onSubmit={(x) => this.orderHandler(x)}>
                    <Input  
                            type="text" 
                            name="name" 
                            placeholder="Your name" 
                            value={this.state.orderForm.name} 
                            change={(event) => this.changeHandler(event, 'name')} />

                    <Input  
                            type="email" 
                            name="email" 
                            placeholder="Your email" 
                            value={this.state.orderForm.email}
                            change={(event) => this.changeHandler(event, 'email')}/>

                    <Input  
                            type="text" 
                            name="street" 
                            placeholder="Street" 
                            value={this.state.orderForm.street}
                            change={(event) => this.changeHandler(event, 'street')} />

                    <Input  
                            type="text" 
                            name="postal" 
                            placeholder="postal code" 
                            value={this.state.orderForm.zipcode}
                            change={(event) => this.changeHandler(event, 'zip')}
                            />

                    <Button btnType="Success">Order</Button>
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

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        price: state.totalPrice
    }
}

export default connect(mapStateToProps)(withRouter(ContactData));