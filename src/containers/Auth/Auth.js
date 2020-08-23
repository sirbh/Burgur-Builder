import React, { Component } from "react";
import Input from "../../components/UI/TrInput/TrInput";
import Button from "../../components/UI/TrButton/TrButton";
import cssclasses from './Auth.module.css'
import * as actionMethod from '../../Store/Actions/index'
import {connect} from 'react-redux'
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom'

class Auth extends Component {
  state = {
    control: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your email",
        },
        value: "",
        validations: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validations: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isFormValid:false,
    isSignUp:true
  };

  componentDidMount()
  {
    if(!this.props.building  && this.props.redirectPath!=="/")
    {
      this.props.onAuthSetRedirect();
    }
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
        return true;
    }
    
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid
    }

    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid
    }

    if (rules.isEmail) {
        const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        isValid = pattern.test(value) && isValid
    }

    if (rules.isNumeric) {
        const pattern = /^\d+$/;
        isValid = pattern.test(value) && isValid
    }

    return isValid;
}

submitHandler=(event) =>
{
  event.preventDefault();
  this.props.onAuth(this.state.control.email.value,this.state.control.password.value,this.state.isSignUp);
}

changeHandler = (id,event) =>
{
  console.log(event.target.value);
  let updatedField = {
       ...this.state.control
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
  this.setState({control:updatedField,isFormValid:isFormValid})
  console.log(updatedField,id);
  console.log(updatedElem)
}

authSwitcher = ()=>
{
  this.setState(prevState=>{return {isSignUp:!prevState.isSignUp}})
}
  render() {
    let inputElemnts = [];
    for (let key in this.state.control) {
      inputElemnts.push({
        id: key,
        config: this.state.control[key],
      });
    }

    let formElements = inputElemnts.map((formElement) => (
      <Input
        inputType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        key={formElement.id}
        value={formElement.config.value}
        changed={this.changeHandler.bind(null, formElement.id)}
        shouldValidate={formElement.config.validations}
        valid={formElement.config.valid}
        touched={formElement.config.touched}
      ></Input>
      
    ));
    if(this.props.loading)
    {
      formElements = <Spinner></Spinner>
    }
    let errorMessage;
    if(this.props.error)
    {
    errorMessage=<p>{this.props.error}</p>
    }
    let authRedirect;
    if(this.props.isAuth)
    {
      authRedirect =<Redirect to= {this.props.redirectPath}></Redirect>
    }
    return (
      <div className={cssclasses.Auth}>
        {errorMessage}
        {authRedirect}
        <form onSubmit={this.submitHandler}>
          
          {formElements}
          <Button btnType="Success" disable={!this.state.isFormValid}>LOGIN</Button>
    
        </form>
        <Button btnType="Danger"  clicked={this.authSwitcher}>Switch to {this.state.isSignUp?'SIGN IN':'SIGN UP'}</Button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch =>
{
  return {
    onAuth:(email,password,isSignUp) => dispatch(actionMethod.auth(email,password,isSignUp)),
    onAuthSetRedirect: () =>dispatch(actionMethod.setAuthRedirectPath('/'))
  }
}

const mapStateToProps = state =>
{
  return {
     loading:state.auth.loading,
     error:state.auth.error,
     isAuth:state.auth.token!==null,
     redirectPath:state.auth.redirectPath,
     building:state.burgurBuilder.building
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
