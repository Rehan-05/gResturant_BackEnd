import { createStore,applyMiddleware  } from "redux";
import {rootReducers} from "./Reducers";
// import { devToolsEnhancer } from "redux-devtools-extension";
import thunk from "redux-thunk";

const ConfigureStore = () => {

   const middleware = [thunk];

   const store = createStore(rootReducers,applyMiddleware(...middleware));
   return store;

}

export default ConfigureStore;