import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import {
  prodReducer,
  prodDetailsReducer,
} from "./components/reducers/prodReducer";
import userReducer from "./components/reducers/userReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({
  product: prodReducer,
  productDetails: prodDetailsReducer,
  user: userReducer,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
