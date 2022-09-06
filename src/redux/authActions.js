import * as ACTIONS from "./Constants";
import { login,userSignUp } from '../api/ApiCalls';

export const logoutSuccess = () => {
  
   return {
        type : ACTIONS.LOGOUT_SUCCESS
    };
}

export const loginSuccess = (authState) => {
    return {
        type : ACTIONS.LOGIN_SUCCESS,
        payload : authState
    };
}

export const loginHandler = credentials => {
 return async (dispatch) => {
    const response = await login(credentials);
    const authState = {
        username: credentials.username,
        password :credentials.password,
        displayName : response.data.displayName,
        image : response.data.image
    }
    dispatch(loginSuccess(authState));
    return response;
 };
};

export const signupHandler = (user) => {
    return async (dispatch) => {
        const response = await userSignUp(user);
        await dispatch(loginHandler(user));
        return response;
    };
};