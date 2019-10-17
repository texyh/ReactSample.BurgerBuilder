
import * as React from 'react';
import Order from '../../../components/order/Order';
import axios from '../../../axios';
import withErrorHandler from '../../hoc/ErrorHandler/withErrorHandler';
import { fetchOrders } from '../../../store/actions/order';
import { connect } from 'react-redux';
import Spinner from '../../../components/UI/Spinner/Spinner';

export interface OrdersProps {
    fetchOrders: () => void
    orders:any[];
    loading: boolean
}
 
export interface OrdersState {
    
}
 
const Orders =  props => {

    React.useEffect(() => {
        props.fetchOrders();
    },[])

    let orders = <Spinner />
    if(!props.loading) {
        orders = <div>
        {props.orders.map(x => {
            return <Order 
                ingredients={x.ingredients}
                price={x.price}
                key={x.id}/>
        })}
    </div>
    }
    return orders
    
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: () => dispatch(fetchOrders())
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));