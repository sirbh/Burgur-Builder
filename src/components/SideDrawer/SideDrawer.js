import React,{Fragment} from 'react'
import Logo from '../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItmes'
import cssClasses from './SideDrawer.module.css'
import BackDrop from '../UI/BackDrop/BackDrop'


const sideDrawer = (props) =>
 
{
    let attachedClasses = [cssClasses.SideDrawer,cssClasses.Close]
    if(props.open)
    {
        attachedClasses = [cssClasses.SideDrawer,cssClasses.Open]
    }
    return(
    <Fragment>
        <BackDrop show={props.open} clicked = {props.closed}></BackDrop> 
    <div className = {attachedClasses.join(" ")} onClick={props.closed}>
        <Logo height = "11%"></Logo>
        <nav>
            <NavigationItems  isAuthenticated = {props.isAuth}></NavigationItems>
        </nav>
    </div>
    </Fragment>)
    
}

export default sideDrawer