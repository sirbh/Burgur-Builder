import React from 'react';
import cssClasses from './BuildControls.module.css';

const buildControls = (props)=>
(
    <div className = {cssClasses.BuildControl}>
        <div className = {cssClasses.Label}>{props.label}</div>
        <button className={cssClasses.Less} onClick = {props.remove} disabled = {props.disableBtn}>Less</button>
        <button className = {cssClasses.More} onClick = {props.add}>More</button>
    </div>
)


export default buildControls;