import React,{Component} from "react";
import "./App.css";
import Layout from "../src/components/Layout/Layout";
import BurgurBuilder from "../src/containers/BurgurBuilder/BurgurBuilder";
import Checkout from "./containers/CheckOut/CheckOut";
import { Route, Switch } from "react-router-dom";
import Orders from './components/Burgur/Orders/Orders'
import Auth from '../src/containers/Auth/Auth'
import Logout from '../src/containers/Auth/Logout/Logout'
import {connect} from 'react-redux'
import * as actions from './Store/Actions/index'

class App extends Component {
  componentDidMount()
  {
    console.log('in app');
    this.props.onCheckState();
  }
  render()
  {
    return <div>
        <Layout>
          <Switch>
            <Route path="/check-out" component={Checkout}></Route>
            <Route path ="/Orders" component={Orders}></Route>
            <Route path="/auth"component={Auth}></Route>
            <Route path="/log-out"component={Logout}></Route>
            <Route path="/"component={BurgurBuilder}></Route>
          </Switch>
        </Layout>
      </div>
  }
}
 

const mapDispatchToProps = (dispatch)=>
{
  return {
    onCheckState:()=>dispatch(actions.checkState())
  }
}

export default connect(null,mapDispatchToProps)(App);
