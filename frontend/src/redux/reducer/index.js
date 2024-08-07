import { combineReducers } from "redux";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  persist: authReducer,
});

export default rootReducer;