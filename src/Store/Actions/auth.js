import * as actions from './actionTypes'
import axios from 'axios'

export const authStart = ()=>
{
    return {
        type:actions.AUTH_START
    }
}

export const logOut =()=>
{  
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type:actions.AUTH_LOGOUT
    }

}

export const setAuthRedirectPath = (path)=>
{
    return {
        type:actions.SET_AUTH_REDIRECT_PATH,
        path
    }
}

export const checkAuthTimeOut =(expirationTime)=>
{
    return dispatch => {
        setTimeout(()=>{
           dispatch(logOut());
        },expirationTime*1000)
    }
}

export const authSuccess = (idToken,localId)=>
{
    return {
        type:actions.AUTH_SUCCESS,
        idToken,
        localId
    }
}

export const authError = (error) =>
{ 
    console.log("frm err",error)
    return {
        type:actions.AUTH_FAIL,
        error
    }
}

export const auth = (email,password,isSignUp) =>
{
    return dispatch =>
    {
        dispatch(authStart());
        let data = {
            email,
            password,
            returnSecureToken:true
        }
        
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAO0dVDZ6dshNQ1rE_HVoO7CsYdvhYv6rU'
        if(isSignUp)
        {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAO0dVDZ6dshNQ1rE_HVoO7CsYdvhYv6rU';
        }
        axios.post(url,data)
             .then(resp=>{console.log(resp);
                localStorage.setItem('token',resp.data.idToken)
                const expDate = new Date(new Date().getTime()+resp.data.expiresIn*1000)
                localStorage.setItem('expirationDate',expDate)
                localStorage.setItem('userId',resp.data.localId);
                dispatch(authSuccess(resp.data.idToken,resp.data.localId));
                dispatch(checkAuthTimeOut(resp.data.expiresIn))
            })
             .catch(err=>{console.log(err.response);dispatch(authError(err.response.data.error.message))})
    }

  
}

export const checkState = ()=>
{
     return dispatch =>
     {
         const token = localStorage.getItem('token');
         
         if(!token)
         {
             dispatch(logOut());
         }
         else
         {
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate<new Date())
            {
                dispatch(logOut())

            }
            else
            {
                const userId = localStorage.getItem('userId');
                dispatch(authSuccess(token,userId));
                dispatch(checkAuthTimeOut((expirationDate.getTime()-new Date().getTime())/1000));
            }
         }
     }
}