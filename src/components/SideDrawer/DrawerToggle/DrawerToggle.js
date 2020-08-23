import React from 'react'
import cssClasses from './DrawerToggle.module.css'

const drawerToggle = (props) =>
{
     return <div onClick={props.clicked} className = {cssClasses.DrawerToggle}>
         <div></div>
         <div></div>
         <div></div>
     </div>
}

export default drawerToggle;