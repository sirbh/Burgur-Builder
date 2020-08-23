import React, {Fragment} from "react";
import cssClasses from "./Modal.module.css";
import BackDrop from '../BackDrop/BackDrop'

const modal = (props) => (
  <Fragment>
    <BackDrop show = {props.show} clicked={props.modalClosed}></BackDrop>
    <div
      className={cssClasses.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100vh)",
        opacity: props.show ? "1" : "0",
      }}
    >
      {props.children}
    </div>
  </Fragment>
);

export default modal;
