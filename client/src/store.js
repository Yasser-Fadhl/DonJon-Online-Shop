import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { prodReducer } from "./components/reducers/prodReducer";
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({
  product: prodReducer,
});
let initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
