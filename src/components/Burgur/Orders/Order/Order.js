import React from "react";
import cssClasses from "./Order.module.css";

const order = (props) => {
 const ingredients= Object.keys(props.ingredients).map((elem,i) =>{
      if(elem==='price'){return null}
      return <p key={i}>{elem +' : '+props.ingredients[elem]}</p>
    })
  return (
    <div className={cssClasses.Order}>
      {ingredients}
      <p>
        Price: <strong>Rs:{props.price}</strong>
      </p>
    </div>
  );
};

export default order;
