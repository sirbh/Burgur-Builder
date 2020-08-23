import * as Actions from './actionTypes'
import axios from '../../axios-orders'

export const addIngredient = (name) =>
{
    return {
        type:Actions.ADD_INGREDIENT,
        ingredientName:name
    }
}

export const removeIngredient = (name) =>
{
    return {
        type:Actions.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

const setIngredient = (ingredient) =>
{
    console.log("ok from me")
    return {
        type:Actions.SET_INGREDIENT,
        ingredient
    }
}

const fetchIngredientFailed = () =>
{
    return{
        type:Actions.FETCH_INGREDIENT_FAILD
    }
}

export const initIngredient = ()=>
{  
    console.log("ok")
    return dispatch =>
    {
        axios.get("ingridients.json")
             .then(data=>
                 {  
                     console.log(data)
                    dispatch(setIngredient(data.data))
                 })
            .catch(err=>{
                dispatch(fetchIngredientFailed())
            });
    }
}