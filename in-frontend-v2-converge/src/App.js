import React from "react";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as Sentry from "@sentry/react";

import Main from "./routes/main";
import authReducer from "./store/reducers/auth";
import bankReducer from "./store/reducers/bank";
import debitCardsReducer from "./store/reducers/debitCards";
import childrenReducer from "./store/reducers/children";
import notificationsReducer from "./store/reducers/notifications";
import plansReducer from "./store/reducers/plans";
import profileReducer from "./store/reducers/profile";
import referralsReducer from "./store/reducers/referrals";
import transactionsReducer from "./store/reducers/transactions";
import virtualAcctReducer from "./store/reducers/virtualAcct";
import walletReducer from "./store/reducers/wallet";

Sentry.init({
  dsn: "https://25301377df914a91a66d31c4f367e1b9@o306522.ingest.sentry.io/5360596",
  debug: true,
  maxValueLength: 1000,
});
//combining all the reducers into one so all components can have access to the central store
const appReducer = combineReducers({
  auth: authReducer,
  bank: bankReducer,
  children: childrenReducer,
  debitCards: debitCardsReducer,

  notifications: notificationsReducer,
  plans: plansReducer,
  profile: profileReducer,
  referrals: referralsReducer,
  transactions: transactionsReducer,
  virtualAcct: virtualAcctReducer,
  wallet: walletReducer,
});

const LOGOUT = "LOGOUT";

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === LOGOUT) {
    console.log("clearing store", store);
    state = {}; //Upon logout, just preserve these states, reset others to default
  }

  return appReducer(state, action);
};
//Redux Dev tools setup
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// creating the redux store
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(ReduxThunk)));

function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}

export default App;
