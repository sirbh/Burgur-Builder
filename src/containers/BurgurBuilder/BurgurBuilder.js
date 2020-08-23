import React, { Component, Fragment } from "react";
import Burgur from "../../components/Burgur/Burgur";
import BurgurControls from "../../components/Burgur/BurgurControls/BurgurControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burgur/OrderSummary/OrderSummary";
import axios from "../../../src/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../components/HOC/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as builderActions from "../../Store/Actions/";

class BurgurBuilder extends Component {
  state = {
    purchasing: false,

  };

  updatePurchaseable() {
    const ingredient = { ...this.props.ingr };
    const ingredientCount = Object.keys(ingredient)
      .map((ignKey) => ingredient[ignKey])
      .reduce((sum, ele) => sum + ele);
    return ingredientCount > 0 
  }
  componentDidMount() {
    // axios.get("Burgur/Ingredients").then(data=>{this.setState({ingredients:data.data});}).catch(err=>console.log(err));
    console.log("google");
    this.props.initIngredient();
  }

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  
  };

  addIngredientHandler = (type) => {
    // const oldCount = this.state.ingredients[type];
    // const updatedCount = oldCount+1;
    // const updatedIngredient = {...this.state.ingredients};
    // updatedIngredient[type] = updatedCount;
    // const oldPrice  = this.state.totalPrice;
    // const addPrice = INGREDIENT_PRICE[type];
    // const updatedPrice = oldPrice+addPrice;
    // this.setState({
    //     ingredients:updatedIngredient,
    //     totalPrice: updatedPrice
    // });
    // this.updatePurchaseable(updatedIngredient);
  };

  purchaseCancalHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    // alert("you continued");
    // this.setState({loading:true})
    // let data = {
    //     ingredients:this.state.ingredients,
    //     price:this.state.totalPrice,
    //     customer:{
    //         name:'saurabh',
    //         zip:'110011',
    //         country:'India'
    //     },
    //     email:'gameOn@game.com',
    //     deliveryMethod:'fastes-possibble'
    // }

    //      axios.post("Burgur/Order",data)
    //      .then(resp => {console.log(resp);this.setState({loading:false,purchasing:false})})

    // let queryParam = [];
    // for (let i in this.state.ingredients) {
    //   queryParam.push(
    //     encodeURIComponent(i) +
    //       "=" +
    //       encodeURIComponent(this.state.ingredients[i])
    //   );
    // }
    // queryParam.push("totalPrice=" + this.state.totalPrice);
    // queryParam = queryParam.join("&");
    if(this.props.isAuth)
    {
      this.props.purchaseStart();
      this.props.history.push("/check-out");
    }
    else
    {
      this.props.onAuthPathSet('/check-out')
      this.props.history.push('/auth')
    }
  
  };

  removeIngredientHandler = (type) => {
    // const oldCount = this.state.ingredients[type];
    // if(oldCount<=0)
    // {
    //     return;
    // }
    // const updatedCount = oldCount-1;
    // const updatedIngredient = {...this.state.ingredients};
    // updatedIngredient[type] = updatedCount;
    // const oldPrice  = this.state.totalPrice;
    // const deductPrice = INGREDIENT_PRICE[type];
    // const updatedPrice = oldPrice-deductPrice;
    // this.setState({
    //     ingredients:updatedIngredient,
    //     totalPrice: updatedPrice
    // });
    // this.updatePurchaseable(updatedIngredient);
  };

  render() {
    const disabledInfo = {
      ...this.props.ingr,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;


    let burgur = this.props.error?<p>Ingredients can't be loaded</p>:<Spinner></Spinner>;
    if (this.props.ingr) {
      burgur = (
        <Fragment>
          <Burgur ingredients={this.props.ingr}></Burgur>
          <BurgurControls
            ingredientAdded={this.props.addIngredient}
            ingredientRemoved={this.props.removeIngredient}
            disableInfo={disabledInfo}
            price={this.props.price}
            purchaseable={this.updatePurchaseable()}
            isAuth={this.props.isAuth}
            ordered={this.purchaseHandler}
          ></BurgurControls>
        </Fragment>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ingr}
          purchaseCancal={this.purchaseCancalHandler}
          purchaseContinue={this.purchaseContinueHandler}
          price={this.props.price}
        ></OrderSummary>
      );
    }
    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancalHandler}
        >
          {orderSummary}
        </Modal>
        {burgur}
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgurBuilder.ingredients,
    price:state.burgurBuilder.totalPrice,
    error:state.burgurBuilder.error,
    isAuth:state.auth.token!==null
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (ingr) =>
      dispatch(builderActions.addIngredient(ingr)),
    removeIngredient: (ingr) =>
      dispatch(builderActions.removeIngredient(ingr)),
    initIngredient:()=>
      dispatch(builderActions.initIngredient()),
    purchaseStart: () => 
      dispatch(builderActions.purchaseInit()),
    onAuthPathSet:(path)=>
      dispatch(builderActions.setAuthRedirectPath(path))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(BurgurBuilder, axios));
