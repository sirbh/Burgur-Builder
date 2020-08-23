import React from 'react'
import cssClasses from './ToolBar.module.css'
import Logo from '../Logo/Logo'
import NavigationItems from '../NavigationItems/NavigationItmes'
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle'


const toolBar = (props) => (
     <header className = {cssClasses.ToolBar}>
         <DrawerToggle clicked={props.drawerToggleClicked}></DrawerToggle>
         <Logo height = "80%"></Logo>
         <nav className={cssClasses.DesktopOnly}>
            <NavigationItems isAuthenticated = {props.isAuth}></NavigationItems>
         </nav>
     </header>
);

export default toolBar;