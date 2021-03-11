import {createStore, applyMiddleware, combineReducers} from "redux";
import * as reducers from "./ducks/index";
import {combineEpics} from "redux-observable";
import {createEpicMiddleware} from "redux-observable";
import {apiMiddleware} from "./middlewares/apimiddleware";
import {
  getSubscriptionPlansEpic,
  createAccountEpic
} from "./ducks/createAccount/epics/rootEpic";
export default function configureStore() {
  const rootReducer = combineReducers(reducers);
  const epicMiddleware = createEpicMiddleware();
  const rootEpic = combineEpics(getSubscriptionPlansEpic, createAccountEpic);
  const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware, apiMiddleware)
  );
  epicMiddleware.run(rootEpic);
  return store;
}
