import React, { Component } from "react";
import TrButton from "../../../components/UI/TrButton/TrButton";
import cssClasses from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import TrInput from "../../../components/UI/TrInput/TrInput";
import {connect} from 'react-redux';
import WithErrorHandler from '../../../components/HOC/withErrorHandler/withErrorHandler'
import * as Actions from '../../../Store/Actions/index'

class ContactDetails extends Component {
  state = {
    orderForm: {
        name: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'your name'
            },
            value:'',
            validations:{
              required:true
            },
            valid:false,
            touched:false
        },
        email: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'your email'
            },
            value:'',
            validations:{
              required:true
            },
            valid:false,
            touched:false
        },
        street: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'street'
            },
            value:'',
            validations:{
              required:true
            },
            valid:false,
            touched:false
        },
        pincode: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'pincode'
            },
            value:'',
            validations:{
              minLength:5,
              maxLength:5,
              required:true
            },
            valid:false,
            touched:false
        },
        country:{
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'country'
            },
            value:'',
            validations:{
              required:true
            },
            valid:false,
            touched:false
        },
        deliveryMethod:{
            elementType:'select',
            elementConfig:{
                options:[
                    {value:'cheapest',displayValue:'Cheapest'},
                    {value:'fastest',displayValue:'Fastest'}
                ],
                
            },
            value:'cheapest',
            validations:{},
            valid:true
            
        }
    },
    loading: false,
    isFormValid:false
  };

  orderButtonHandler = (event) => {
    event.preventDefault();
    // this.setState({ loading: true });
    let formData = {}
    for(let key in this.state.orderForm)
    {
        formData[key] = this.state.orderForm[key].value;
    }

    console.log(formData);
    let data = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      formData:formData,
      userId:this.props.userId
    };

    // axios.post("Burgur/Order", data).then((resp) => {
    //   console.log(resp);
    //   this.setState({ loading: false, purchasing: false });
    //   this.props.history.push("/");
    // });

    this.props.startBurgurOrder(data,this.props.token);
  };

  checkValidity(value,rules)
  { 
    let isValid = true
    if(rules.required)
    {
      isValid = value.trim() !== "";
    }

    if(rules.minLength)
    {
      isValid = value.length >=rules.minLength && isValid;
    }

    if(rules.maxLength)
    {
      isValid = value.length <=rules.maxLength && isValid;
    }

    return isValid;

  }

  changeHandler = (id,event) =>
  {
    console.log(event.target.value);
    let updatedField = {
         ...this.state.orderForm
    }
    let updatedElem = {
      ...updatedField[id]
    }

    updatedElem.value=event.target.value;
    updatedElem.touched=true;
    
    updatedElem.valid=this.checkValidity(updatedElem.value,updatedElem.validations)

    updatedField[id] = updatedElem;
    let isFormValid = true;
    for(let key in updatedField)
    { 
      console.log(updatedField[key].valid)
      isFormValid = updatedField[key].valid && isFormValid;
    }
    console.log("this",isFormValid);
    this.setState({orderForm:updatedField,isFormValid:isFormValid})
    console.log(updatedField,id);
    console.log(updatedElem)
  }

  render() {
    let inputElemnts = [];
    for(let key in this.state.orderForm)
    {
      inputElemnts.push({
        id:key,
        config:this.state.orderForm[key]
      })
    }
    let formElements = inputElemnts.map(formElement=><TrInput inputType = {formElement.config.elementType} 
                                                              elementConfig = {formElement.config.elementConfig} 
                                                              key={formElement.id}
                                                              value={formElement.config.value}
                                                              changed = {this.changeHandler.bind(null,formElement.id)}
                                                              shouldValidate = {formElement.config.validations}
                                                              valid = {formElement.config.valid}
                                                              touched = {formElement.config.touched}></TrInput>)
    let form = (
      <form onSubmit={this.orderButtonHandler}>
        {formElements}
        <TrButton btnType="Success" disable={!this.state.isFormValid}>
          ORDER
        </TrButton>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner></Spinner>;
    }

    return (
      <div className={cssClasses.ContactData}>
        <h4>Enter your contact number</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state)=>
{
  return {
    ingredients:state.burgurBuilder.ingredients,
    totalPrice:state.burgurBuilder.totalPrice,
    loading:state.orders.loading,
    token:state.auth.token,
    userId:state.auth.userId
  }
}

const mapDipatchToProps = (dispatch)=>
{
   return {
     startBurgurOrder:(orderData,token)=>{dispatch(Actions.burgurPurchase(orderData,token))}
   }
}

export default connect(mapStateToProps,mapDipatchToProps)(WithErrorHandler(ContactDetails,axios));
