import React from 'react'
import cssClasses from './NavigationItems.module.css';
import NavigationItem from '../NavigationItems/NavigationItem/NavigationItem';

const navigationItmes = (props) =>
{
    return <ul className = {cssClasses.NavigationItems}>
         <NavigationItem link = "/" exact >Burgur Builder</NavigationItem>
         {props.isAuthenticated?<NavigationItem link = "/Orders" >Orders</NavigationItem>:null}
         {props.isAuthenticated
          ?<NavigationItem link = "/log-out" >Log Out</NavigationItem>
          :<NavigationItem link = "/auth" >Log In</NavigationItem>}
         
    </ul>
}

export default navigationItmes;