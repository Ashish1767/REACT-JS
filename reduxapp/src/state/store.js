import { applyMiddleware} from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import {legacy_createStore} from "redux"
 const createStore=legacy_createStore;



  export const store=createStore(reducers,{},applyMiddleware(thunk))

 