import React from 'react';
import cssClasses from './BurgurIngredients.module.css';
import PropTypes from 'prop-types';

const burgurIngredients = (props) =>
{   

    let ingredient = null;
    switch(props.type)
    {
        case('bread-bottom'):
        ingredient = <div className = {cssClasses.BreadBottom}></div>;
        break;

        case('bread-top'):
        ingredient = <div className = {cssClasses.BreadTop}>
                            <div className = {cssClasses.Seeds1}>

                            </div>
                            <div className = {cssClasses.Seeds2}>

                            </div>
                     </div>
        break;

        case('meat'):
        ingredient = <div className = {cssClasses.Meat}></div>
        break;

        case('cheese'):
        ingredient = <div className = {cssClasses.Cheese}></div>
        break;

        case('salad'):
        ingredient = <div className = {cssClasses.Salad}></div>
        break;

        case('bacon'):
        ingredient = <div className = {cssClasses.Bacon}></div>
        break;

        default:
            ingredient = <p></p>;
    }
    return ingredient;
}

burgurIngredients.protoTypes = 
{
    type: PropTypes.string.isRequired
}

export default burgurIngredients