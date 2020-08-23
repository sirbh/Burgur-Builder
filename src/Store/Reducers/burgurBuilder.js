import * as actionTypes from "../Actions/actionTypes";

const INGREDIENT_PRICE = 
{
    cheese: 20,
    bacon: 30,
    salad:15,
    meat:25
}

const initialState = {
  ingredients:null,
  totalPrice: 40,
  error:false,
  building:false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: {
      return {
          ...state,
          ingredients:{
              ...state.ingredients,
              [action.ingredientName]:state.ingredients[action.ingredientName]+1
          },
          totalPrice:state.totalPrice+INGREDIENT_PRICE[action.ingredientName],
          building:true
      };
    }
    case actionTypes.REMOVE_INGREDIENT: {
      if(state.ingredients[action.ingredientName]<=0)
      {
          return
      }
      return {
        ...state,
        ingredients:{
            ...state.ingredients,
            [action.ingredientName]:state.ingredients[action.ingredientName]-1
        },
        totalPrice:state.totalPrice-INGREDIENT_PRICE[action.ingredientName],
        building:true

    };
    }
    case actionTypes.SET_INGREDIENT:{
      console.log("ok set")
      return{
        ...state,
        ingredients:action.ingredient,
        error:false,
        totalPrice:40,
        building:false
      }
    }
    case actionTypes.FETCH_INGREDIENT_FAILD:{
      return{
        ...state,
        error:true
      }
    }
    default: {
      return state;
    }
  }
};

export default reducer;
