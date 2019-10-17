import React, { Component } from "react";
import Layout from './containers/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
import Checkout from "./containers/Checkout/Checkout";
import {Route, Switch} from  'react-router-dom';
import Orders from "./containers/Checkout/Orders/Orders";

const App = props => {

    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/" component={BurgerBuilder} exact  />
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
          </Switch>
        </Layout>
      </div>
    );
}

export default App

