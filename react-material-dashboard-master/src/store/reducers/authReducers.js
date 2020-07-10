import { AUTH_ACTION_TYPES } from "store/actions/actionTypes/authActionTypes";

const initState = {
  userRole: '',
  UserName: ''
}

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SIGNUP_SUCCESS:
      console.log('SignUp user ', action.payload);

      return state
    case AUTH_ACTION_TYPES.SIGNUP_ERROR:
      console.log('SignUp error ', action.err);
      return state;
    case AUTH_ACTION_TYPES.SIGNIN_SUCCESS:
      console.log('login success ', action.payload);
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      console.log('Payload from login: ', payload);
      var userRole = payload.role;
      console.log('userRole from login: ', userRole);
      var userName = payload.UserName
      console.log('userName from login: ', userName);
      return {
        ...state,
        authError: null,
        succeeded: action.payload.succeeded,
        userRole: userRole,
        UserName: userName
      };
    case AUTH_ACTION_TYPES.SIGNIN_ERROR:
      console.log('login error ');
      return {
        ...state,
        authError: 'Login failed.',
        isSignedIn: false
      };
    case AUTH_ACTION_TYPES.SIGNOUT_SUCCESS:
      console.log('signout success ');
      return {
        ...state,
        authError: null,
        succeeded: false
      };
    case AUTH_ACTION_TYPES.SIGNOUT_ERROR:
      console.log('signout error ');
      return state;
    default:
      return state;
  }
}

export default authReducer
