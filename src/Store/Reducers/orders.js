import * as actionTypes from '../Actions/actionTypes'

const initialState = {
    currentOrder:[],
    prevOrders:[],
    loading:false,
    purchased:false
}

const reducer = (state=initialState,action) =>
{
    switch(action.type)
    {
        case actionTypes.PURCHASE_BURGUR_SUCCESS:{
            console.log('google');
            const newOrder = {
                id:action.orderId,
                ...action.orderData
            }
            return{
                ...state,
                loading:false,
                purchased:true,
                currentOrder:state.currentOrder.concat(newOrder)
            }
        }
        case actionTypes.PURCHASE_BURGUR_FAILURE:{
            return{
                ...state,
                loading:false
            }
        }

        case actionTypes.PURCHASE_BURGUR_START:{
            return {
                ...state,
                loading:true
            }
        }
        case actionTypes.PURCHASE_INIT:{
            return {
                ...state,
                purchased:false
            }
        }
        case actionTypes.FETCH_ORDERS_START:
            {
                return {
                    ...state,
                    loading:true
                }
            }
        case actionTypes.FETCH_ORDERS_SUCCESS:
            {
                return{
                    ...state,
                    loading:false,
                    prevOrders:action.orders
                }
            }
        case actionTypes.FETCH_ORDERS_FAIL:
            {
                return{
                    ...state,
                    loading:false
                }
            }
        default:
        {
            return state
        }

    }
}

export default reducer