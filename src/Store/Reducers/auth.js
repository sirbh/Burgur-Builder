import * as actionTypes from '../Actions/actionTypes'

const initialState = {
    token:null,
    userId:null,
    error:null,
    loading:false,
    redirectPath:'/'
};

const reducer = (state=initialState,action) =>
{
      switch(action.type){
          case actionTypes.AUTH_START:
              {
                  return {
                      ...state,
                      loading:true,
                      error:null
                  }
              }
          case actionTypes.AUTH_SUCCESS:
              {
                  console.log('loc',state)
                  return {
                      ...state,
                      userId:action.localId,
                      token:action.idToken,
                      loading:false
                  }
              }
          case actionTypes.AUTH_FAIL:
              {
                  return {
                      ...state,
                      error:action.error,
                      loading:false
                  }
              }    
          case actionTypes.AUTH_LOGOUT:
              {
                  return {
                      ...state,
                      userId:null,
                      token:null
                  }
              }
          case actionTypes.SET_AUTH_REDIRECT_PATH:
              {
                  return {
                      ...state,
                      redirectPath:action.path
                  }
              }
          default:
            {
                  return state
            }
      }
};

export default reducer