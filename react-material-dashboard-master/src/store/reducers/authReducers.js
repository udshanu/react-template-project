import { AUTH_ACTION_TYPES } from "store/actions/actionTypes/authActionTypes";

export const initState = {
  UserId: '',
  UserRole: '',
  UserName: '',
  FirstName: '',
  LastName: ''
}

const authReducer = (state = initState, action) => {
  //const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTION_TYPES.SIGNUP_SUCCESS:
      console.log('signup success ', action.payload);
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      console.log('Payload from signup: ', payload);
      // var userRole = payload.role;
      // console.log('userRole from signup: ', userRole);
      // var userName = payload.UserName
      // console.log('userName from signup: ', userName);
      return {
        ...state,
        authError: null,
        UserRole: payload.role,
        UserName: payload.UserName,
        FirstName: payload.FirstName,
        LastName: payload.LastName
      };
    case AUTH_ACTION_TYPES.SIGNUP_ERROR:
      console.log('SignUp error ', action.err);
      return state;
    case AUTH_ACTION_TYPES.SIGNIN_SUCCESS:
      var payload = JSON.parse(window.atob(localStorage.getItem('token').split('.')[1]));
      console.log('SignIn ', payload);
      var userRole = payload.role;
      var userName = payload.UserName
      return {
        ...state,
        authError: null,
        UserRole: userRole,
        UserName: userName,
        FirstName: payload.FirstName,
        LastName: payload.LastName
      };
    case AUTH_ACTION_TYPES.SIGNIN_ERROR:
      console.log('login error ');
      return {
        ...state,
        authError: 'Login failed.'
      };
    case AUTH_ACTION_TYPES.SIGNOUT_SUCCESS:
      console.log('signout success ');
      return {
        ...state,
        authError: null
      };
    case AUTH_ACTION_TYPES.SIGNOUT_ERROR:
      console.log('signout error ');
      return state;
    default:
      return state;
  }
}

export default authReducer
