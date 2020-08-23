import React from "react";
import Burgur from "../Burgur/Burgur";
import TrButton from "../UI/TrButton/TrButton";
import cssClasses from './CheckOutSummary.module.css'

const checkOutSummary = (props) => {
  
  return (
    <div className = {cssClasses.CheckOutSummary}>
      <h1>We hope It taste well!</h1>
      <div style={{ width: "300px",margin: "auto" }}>
        <Burgur ingredients={props.ingredients}></Burgur>
      </div>
      <TrButton btnType="Success" clicked={props.checkOutContinued}>
        CONTINUE
      </TrButton>
      <TrButton btnType="Danger" clicked={props.checkOutCancaled}>
        CANCAL
      </TrButton>
    </div>
  );
};

export default checkOutSummary;
