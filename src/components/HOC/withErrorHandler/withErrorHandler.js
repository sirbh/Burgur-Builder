import React, { Fragment, Component } from "react";
import Modal from "../../UI/Modal/Modal";

const withErrorHandler = (WrappedComponent,axios) => {
  return class extends Component {

    state = {
        showError: null
    }

    interResp;
    interReq;

    turnOff;

    componentWillMount()
    { 

      console.log("mount");
      this.turnOff = true;
      this.udpdater = true;
      this.interResp = axios.interceptors.response.use(resp=>{return resp},error => {
          
            console.log("error")
            if(this.turnOff===true){
              this.setState({showError:error})
              console.log("inside")
            }
           
           
             
       })
      this.interReq=axios.interceptors.request.use(req => {return req})
    }

    componentWillUnmount()
    {
        this.turnOff=false;
        axios.interceptors.request.eject(this.interReq)
        axios.interceptors.response.eject(this.interResp) 
        console.log("unmount");
    }


    
    errorClear = ()=>
    {   

        this.setState({showError:null});
    }
    render() {
      return (
        <Fragment>
          <Modal show={this.state.showError} modalClosed ={this.errorClear}>{this.state.showError?this.state.showError.message:null} </Modal>
          <WrappedComponent {...this.props}></WrappedComponent>
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
