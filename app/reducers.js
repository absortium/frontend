/**
 * Combine all reducers in this file and export the combined reducers.
 * If we were to do this in store.js, reducers wouldn't be hot reloadable.
 */

import { fromJS } from "immutable";
import { combineReducers } from "redux-immutable";
import { LOCATION_CHANGE } from "react-router-redux";
import globalReducer from "containers/App/reducer";
import headerReducer from "containers/Header/reducer";
import exchangeBoxReducer from "containers/ExchangeBox/reducer";
import marketInfoReducer from "containers/MarketInfo/reducer";
import exchangeOffersReducer from "containers/ExchangeOffers/reducer";
import accountBoxReducer from "containers/AccountBox/reducer";
import withdrawalDialogReducer from "containers/WithdrawalDialog/reducer";
import exchangeListBoxReducer from "containers/ExchangeListBox/reducer";
import { reducer as toastrReducer } from "react-redux-toastr";

/*
 * routeReducer
 *
 * The reducer merges route location changes into our immutable state.
 * The change is necessitated by moving to react-router-redux@4
 *
 */

// Initial routing state
const routeInitialState = fromJS({
  locationBeforeTransitions: null,
});

/**
 * Merge route into the global application state
 */
function routeReducer(state = routeInitialState, action) {
  switch (action.type) {
    /* istanbul ignore next */
    case LOCATION_CHANGE:
      return state.merge({
        locationBeforeTransitions: action.payload,
      });
    default:
      return state;
  }
}

/**
 * Creates the main reducer with the asynchronously loaded ones
 */

export default function createReducer(asyncReducers) {
    return combineReducers({
        route: routeReducer,
        global: globalReducer,
        header: headerReducer,
        exchangeListBox: exchangeListBoxReducer,
        exchangeBox: exchangeBoxReducer,
        exchangeOffers: exchangeOffersReducer,
        marketInfo: marketInfoReducer,
        accountBox: accountBoxReducer,
        withdrawalDialog: withdrawalDialogReducer,
        toastr: toastrReducer,
        ...asyncReducers,
    });
}
