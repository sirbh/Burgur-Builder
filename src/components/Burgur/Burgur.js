import React from 'react';
import BurgurIngredients from './BurgurIngredients/BurgurIngredients'
import cssClasses from './Burgur.module.css';

const burgur = (props)=>
{    
    let transformedIngredients = Object.keys(props.ingredients).map(
        (ignKey=>
             [...Array(props.ingredients[ignKey])].map((_,i)=><BurgurIngredients type = {ignKey} key = {ignKey+i}></BurgurIngredients>))).reduce((arr,temp)=>arr.concat(temp))
     
     if(transformedIngredients.length===0)
     {
         transformedIngredients = <p>PLEASE START ADDING INGRDIENTS</p>
     }
     return (
         <div className={cssClasses.Burgur}>
             <BurgurIngredients type = 'bread-top'></BurgurIngredients>
             {transformedIngredients}
             <BurgurIngredients type = 'bread-bottom'></BurgurIngredients>
         </div>
     );
};

export default burgur;