import { combineReducers } from "redux";
import changeState from "./todo";

const rootReducer = combineReducers({ todoState: changeState });

export default rootReducer;
