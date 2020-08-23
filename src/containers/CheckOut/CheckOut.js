import React, { Component } from "react";
import CheckOutSummary from "../../components/CheckOutSummary/CheckOutSummary";
import ContactData from "../CheckOut/ContactData/ContactData";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class CheckOut extends Component {
  // state = {
  //     ingredients:null,
  //     totalPrice:0
  //   };

  componentWillMount() {

    // const query = new URLSearchParams(this.props.location.search);
    // const ingredients = {}
    // let totalPrice=0;
    // for(let i of query.entries())
    // {

    //   let [a,b] = i;
    //   if(a==='totalPrice')
    //   {
    //      totalPrice=Number(b);
    //   }
    //   ingredients[a]=Number(b);

    // }
    // this.setState({ingredients:ingredients,totalPrice:totalPrice});
  }
  checkOutCancalHandler = () => {
    this.props.history.goBack();
  };

  checkOutContinueHandler = () => {
    this.props.history.replace("/check-out/contact-data");
  };
  render() {
    let summary = <Redirect to="/"></Redirect>;

    if (this.props.ingr) {

      summary = (
        <div>
          <CheckOutSummary
            ingredients={this.props.ingr}
            checkOutCancaled={this.checkOutCancalHandler}
            checkOutContinued={this.checkOutContinueHandler}
          ></CheckOutSummary>
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          ></Route>
        </div>
      );
    }
    if (this.props.purchased) {
      summary = <Redirect to="/"></Redirect>;
    }

  return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ingr: state.burgurBuilder.ingredients,
    purchased: state.orders.purchased,
  };
};



export default connect(mapStateToProps)(CheckOut);
