import * as actionTypes from './actionTypes'
import axios from '../../axios-orders'


export const burgurPurchaseSuccess = (id,orderData) =>
{   
    console.log('ok');
    return {
        type:actionTypes.PURCHASE_BURGUR_SUCCESS,
        orderId:id,
        orderData
    }
}

export const burgurPurchaseFailure = (error) =>
{
    return {
        type:actionTypes.PURCHASE_BURGUR_FAILURE,
        error
    }
}

export const burgurPurchase = (orderData,token) =>
{
    return dispatch =>
    {    
        dispatch(burgurPurchaseStart())
        axios.post("orders.json?auth="+token, orderData)
             .then((resp) => {
                 console.log(resp)
                dispatch(burgurPurchaseSuccess(resp.data.name,orderData))
          }).catch(err =>
            {
                console.log('fail');
                dispatch(burgurPurchaseFailure(err))
            });
    }
}

export const burgurPurchaseStart = ()=>
{
    return {
        type:actionTypes.PURCHASE_BURGUR_START
    }
}

export const purchaseInit = ()=>
{
    return{
        type:actionTypes.PURCHASE_INIT
    }
}

export const fetchOrdersFail = (error)=>
{
    return {
        type:actionTypes.FETCH_ORDERS_FAIL,
        error
    }
}

export const fetchOrderSuccess = (orders)=>
{
    return {
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
}

export const fetchOrderStart = () =>
{
    return {
        type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders = (token,userId)=>
{
    
    return (dispatch) =>
    {
        dispatch(fetchOrderStart())
        const reqParam = '?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios
        .get("orders.json"+reqParam)
        .then((resp) => {
          console.log(Object.keys(resp.data).map(i=>{return {id:i,data:resp.data[i]}}));
          dispatch(fetchOrderSuccess(Object.keys(resp.data).map(i=>{return {id:i,data:resp.data[i]}}))
        )})
        .catch((error) => {
        dispatch(fetchOrdersFail(error))
        })
    }
}