import React, { Component } from "react";
import Order from "./Order/Order";
import anxios from "../../../axios-orders";
import WithErrorHandler from '../../HOC/withErrorHandler/withErrorHandler'
import Spinner from '../../UI/Spinner/Spinner'
import {connect} from 'react-redux'
import * as actionMethods from '../../../Store/Actions/index'

class Orders extends Component {
  state = {
    orders: [],
    loading: true,
  };
  componentDidMount() {
    // anxios
    //   .get("Burgur/Orders")
    //   .then((resp) => {
    //     console.log(resp);
    //     this.setState(
    //       {loading:false,orders:resp.data}
         
    //       )
    //   })
    //   .catch((resp) => {
    //       console.log(resp);
    //       this.setState({loading:false})

    //   })
      this.props.getOrders(this.props.token,this.props.userId);
    }
  render() {
    let orders = <p>No previous orders</p> 
    if(orders)
    {
      orders =<div>
      {this.props.orders.map((elem) => <Order key = {elem.id} price = {elem.data.price} ingredients = {elem.data.ingredients}></Order>)}
    </div>
    }
    
    if (this.props.loading)
    {
      orders = <Spinner></Spinner>
    }
    return (
      orders
    );
  }
}

const mapDispatchToProps = (dispatch) =>
{
  return {
    getOrders:(token,userId)=>dispatch(actionMethods.fetchOrders(token,userId))
  }
}

const mapStateToProps = (state)=>
{
  return{
    loading:state.orders.loading,
    orders:state.orders.prevOrders,
    token:state.auth.token,
    userId:state.auth.userId
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(Orders,anxios));
