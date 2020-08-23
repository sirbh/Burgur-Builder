import React from 'react'
import BurgurLogo from '../../assests/images/burger-logo.png'
import cssClasses from './Logo.module.css'

const logo = (props) =>
(
     <div className={cssClasses.Logo} style = {{height:props.height}}>
         <img src = {BurgurLogo} alt="myBurgur"/>
     </div>
)

export default logo;