import React from 'react'
import cssClasses from './BackDrop.module.css'

const backDrop = (props)=>
{
    return (
        props.show?<div className = {cssClasses.BackDrop} onClick = {props.clicked}></div>:null
    );
}


export default backDrop;