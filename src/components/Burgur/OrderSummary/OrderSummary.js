import React,{Fragment} from 'react';
import TrButton from '../../UI/TrButton/TrButton';

const orderSummary = (props) =>
{    
const itemList = Object.keys(props.ingredients).map((ignKey)=> <li key = {ignKey}><span>{ignKey}</span>:{props.ingredients[ignKey]}</li>)
    return (<Fragment>
        <h3>Your Order</h3>
        <p>Ingredients Added</p>
        <ul>
           {itemList}
        </ul>
        <p>Continue to checkout</p>
        <p>Total Price Rs. <strong>{props.price}</strong></p>
        <TrButton btnType="Success" clicked = {props.purchaseContinue}>CONTINUE</TrButton>
        <TrButton btnType="Danger" clicked = {props.purchaseCancal}>CANCAL</TrButton>
    </Fragment>)
}

export default orderSummary;