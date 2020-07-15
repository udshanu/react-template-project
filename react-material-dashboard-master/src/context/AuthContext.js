import React, { createContext, useState, useEffect, useReducer } from 'react'
import HiddenValues from '../common/getTokenHiddnVales'
import authReducer, { initState } from 'store/reducers/authReducers';
import { AUTH_ACTION_TYPES } from 'store/actions/actionTypes/authActionTypes';

export const AuthContext = createContext();

const initialAuth = {
    userId: '',
    role: '',
    userName: '',
    firstName: '',
    lastName: '',
    token:''
}

const reducer = (state, action) => {
    switch (action.type){
      case AUTH_ACTION_TYPES.SIGNIN_SUCCESS:
        var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
        console.log('SignIn reducer', payload);
        return {
          ...state,
          authError: null,
          userId: payload.UserID,
          role: payload.role,
          userName: payload.UserName,
          firstName: payload.FirstName,
          lastName: payload.LastName,
          token: localStorage.getItem('token')
        };
      case AUTH_ACTION_TYPES.SIGNIN_ERROR:
        console.log('login error reducer');
        return {
          ...state,
          authError: 'Login failed.'
        };
    case AUTH_ACTION_TYPES.LOAD_INIT_PROFILE_DATA:
        if (localStorage.getItem('token') != null){
            var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
            console.log('LOAD_INIT_PROFILE_DATA', payload);
            return {
                    ...state,
                    authError: null,
                    userId: payload.UserID,
                    role: payload.role,
                    userName: payload.UserName,
                    firstName: payload.FirstName,
                    lastName: payload.LastName,
                    token: localStorage.getItem('token')
                }
        }
        else {
            return ({...state})
        }
        case AUTH_ACTION_TYPES.SIGNOUT_SUCCESS:
      console.log('signout success ');
      return {
        ...state,
        authError: null,
        userId: '',
        role: '',
        userName: '',
        firstName: '',
        lastName: '',
        token: ''
      };
    case AUTH_ACTION_TYPES.SIGNOUT_ERROR:
      console.log('signout error ');
      return state;
      default:
          return state;
    }
  }

const AuthContextProvider = (props) => {
    
    const [count, dispatch] = useReducer(reducer, initialAuth)

    useEffect(() => {
        dispatch({type: AUTH_ACTION_TYPES.LOAD_INIT_PROFILE_DATA});
    }, []);

    return (
        //  <AuthContext.Provider value={{...auth}}>
        <AuthContext.Provider value={{countState: count, countDispatch: dispatch}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
