import Login from "views/pages/examples/Login";
import { ActionTypes } from "../constants/action-type";




export const LoginAuth = (auth) => {
    
    return {
        type: ActionTypes.LOGIN_USER,
        payload: auth
    };
};

// export const selectUser = (auth) => {
//     debugger;
//     return {
//         type: ActionTypes.LOGIN_USER,
//         payload: auth
//     };
// };

export const logout=()=> (dispatch)=>{
debugger
    localStorage.removeItem('User_Login');
      dispatch({type:ActionTypes.LOGOUT_USER});
    }
