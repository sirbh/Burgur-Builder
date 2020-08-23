import React from 'react'
import cssClasses from './TrButton.module.css'

const trButton = (props) => 
{
    return <button onClick = {props.clicked} disabled={props.disable}
                   className = {[cssClasses.Button,cssClasses[props.btnType]].join(' ')}>{props.children}</button>
}

export default trButton