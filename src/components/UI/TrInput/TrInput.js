import React from 'react'
import classes from './TrInput.module.css'

const trInput = (props) =>
{   
    let inputElement = null;

    let cssclasses = [classes.InputElement];
    if(!props.valid && props.shouldValidate&&props.touched)
    {
        cssclasses.push(classes.Invalid);
    }

    switch(props.inputType){
        case ('input'):
        {
            inputElement =  <input onChange={props.changed} className = {cssclasses.join(' ')} {...props.elementConfig} value={props.value}></input>;
            break;
        }
        case('textarea'):
        {
            inputElement = <textarea onChange={props.changed} className = {cssclasses.join(' ')} {...props.elementConfig} value={props.value}></textarea>;
            break;
        }
        case('select'):
        {
            inputElement = (<select onChange={props.changed} className = {cssclasses.join(' ')} value={props.value}>
                {props.elementConfig.options.map((ele,id)=><option key={id} value={ele.value}>{ele.displayValue}</option>)}
            </select>);
            break;
        }
        default:
            {
                inputElement = <input onChange={props.changed} className = {cssclasses.join(' ')} {...props.elementConfig} value={props.value}></input>;
                break;
            }
    }
     return (
         <div className={classes.Input}>
             <label classes = {classes.Label}>{props.label}</label>
             {inputElement}
         </div>
     )
}

export default trInput