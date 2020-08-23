import React ,{Component} from 'react'
import * as action from '../../../Store/Actions/index'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Logout extends Component
{
    componentDidMount()
    {
        this.props.onLogout();
    }
    render()
    {
        return (
            <Redirect to='/'></Redirect>
        );
    }
}

const mapDispatchToProps = (dispatch)=>
{
    return {
        onLogout:()=>dispatch(action.logOut())
    }
}

export default connect(null,mapDispatchToProps)(Logout);