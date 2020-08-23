import React, { Fragment, Component } from "react";
import cssClasses from './Layout.module.css';
import ToolBar from '../ToolBar/TooBar';
import SideDrawer from '../SideDrawer/SideDrawer'
import {connect} from 'react-redux'


class Layout extends Component {
  
  state = {
    sideDrawerClosed:false
  }
  sideDrawerClosedHandler = ()=>
  {
       this.setState({sideDrawerClosed:false});
  }

  sideDrawerToggle= () =>
  {
    console.log("cool");
    this.setState({sideDrawerClosed:!this.state.sideDrawerClosed});
  }

  render()
  {
  return (
    <Fragment>
      <ToolBar  drawerToggleClicked = {this.sideDrawerToggle} isAuth = {this.props.isAuthenticated}></ToolBar>
      <SideDrawer open = {this.state.sideDrawerClosed} closed = {this.sideDrawerClosedHandler} isAuth = {this.props.isAuthenticated}></SideDrawer>
      <main className = {cssClasses.Content}>{this.props.children}</main>
    </Fragment>
  );
}
}

const mapStateToProps = (state)=>
{
     return {
       isAuthenticated:state.auth.token!==null
     }
}

export default connect(mapStateToProps)(Layout);