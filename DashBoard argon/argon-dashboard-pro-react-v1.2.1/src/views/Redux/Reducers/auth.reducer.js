import { ActionTypes } from "../constants/action-type";

// const initialState = {
//     auth: null,
// }
const Get_LocalStorage_User = () => {
    let user = localStorage.getItem('User_Login'); 
    if(user){
        return {auth:JSON.parse(user)};
    }
    else{
        return {auth:null}
    }
}
export const LoginUserReducer= (state = Get_LocalStorage_User(),{type,payload}) => {
    debugger
   switch (type) {
       case ActionTypes.LOGIN_USER:
           return {...state, auth: payload};
       case ActionTypes.LOGOUT_USER:
              return {...state,auth:null};
       default:
           return state;
   }
};

// export const SelectLoginUser= (state = {},{type,payload}) => {
//     debugger
//     switch (type) {
//         case ActionTypes.LOGIN_USER:
//             return {...state, ...payload};
//         default:
//             return state;
//     }
//  };
