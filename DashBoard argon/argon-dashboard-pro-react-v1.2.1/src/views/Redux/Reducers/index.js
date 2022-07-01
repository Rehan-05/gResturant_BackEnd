import { combineReducers } from "redux";
import { LoginUserReducer} from "./auth.reducer";

export const rootReducers = combineReducers({
    LoginUser: LoginUserReducer,
});

