
import * as React from 'react';
import Order from '../../../components/order/Order';
import axios from '../../../axios';
import withErrorHandler from '../../hoc/ErrorHandler/withErrorHandler';

export interface OrdersProps {
    
}
 
export interface OrdersState {
    
}
 
class Orders extends React.Component<OrdersProps, OrdersState> {
    state = { 
        orders:[],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then(res => {
            let orders = []
            for(let key in res.data) {
                orders.push({...res.data[key], id: key});
            }
            this.setState({loading : false, orders})
        }).catch(x => this.setState({loading : false}))
    }

    render() { 

        return ( 
            <div>
                {this.state.orders.map(x => {
                    return <Order 
                     ingredients={x.ingredients}
                     price={x.price}
                     key={x.id}/>
                })}
            </div>
         );
    }
}
 
export default withErrorHandler(Orders, axios);