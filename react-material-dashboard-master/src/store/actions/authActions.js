import authServices from '../services/authServices';
import { AUTH_ACTION_TYPES } from "store/actions/actionTypes/authActionTypes";

export const signUp = (signup) => {
    return (dispatch, getState) => {
        authServices.auth().signUp(signup).then((response) => {
            
            localStorage.setItem('token', response.data.token);

            dispatch({type: AUTH_ACTION_TYPES.SIGNUP_SUCCESS, payload: response.data});
        }).catch((err) => {
            dispatch({type: AUTH_ACTION_TYPES.SIGNUP_ERROR, err});
        })
        
    }
};

export const signIn = (credentials) => {
    return (dispatch, getState) => {
        authServices.auth().signIn(credentials).then((response) => {
            console.log('Login Response: ', response);

            localStorage.setItem('token', response.data.token);

            dispatch({type: AUTH_ACTION_TYPES.SIGNIN_SUCCESS, payload: response.data});
            
        }).catch((err) => {
            dispatch({type: AUTH_ACTION_TYPES.SIGNIN_ERROR, err});
        })
        
    }
};

export const signOut = () => {
    return (dispatch, getState) => {
        authServices.auth().signOut().then((response) => {
            console.log('signOut Response: ', response);

            if (response.data.succeeded) {
                localStorage.removeItem('token');
                dispatch({type: AUTH_ACTION_TYPES.SIGNOUT_SUCCESS, payload: response.data});
            }
            else {
                dispatch({type: AUTH_ACTION_TYPES.SIGNOUT_ERROR});
            }
            
        }).catch((err) => {
            dispatch({type: AUTH_ACTION_TYPES.SIGNOUT_ERROR, err});
        })
        
    }
};