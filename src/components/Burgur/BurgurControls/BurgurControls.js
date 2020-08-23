import React from 'react' ;
import cssClasses from './BurgurControls.module.css'
import BuildControls from './BuildControls/BuildControls'

const controls = [
    {label: 'Salad', type: 'salad'},
    {label: 'Meat', type: 'meat'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
];


const burgurControls = (props) => (
              <div className={cssClasses.BurgurControls}>
                  <p>Current Price Rs. <strong>{props.price}</strong></p>
                  {controls.map(ctrl=><BuildControls label = {ctrl.label} key = {ctrl.label} add ={props.ingredientAdded.bind(null,ctrl.type)} remove={props.ingredientRemoved.bind(null,ctrl.type)} disableBtn = {props.disableInfo[ctrl.type]}></BuildControls>)}
                  <button disabled = {!props.purchaseable} className = {cssClasses.OrderButton} onClick = {props.ordered}>{props.isAuth?'Order Now':'Sign Up to Order'}</button>
              </div>
    );


export default burgurControls;