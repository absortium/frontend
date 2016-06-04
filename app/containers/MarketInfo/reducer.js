/*
 *
 * ExchangePage reducer
 *
 */

import {MARKET_INFO_RECEIVED} from "containers/App/constants";

const initialState = {
    marketInfo: null,
    marketInfoLoaded: false,
};

function marketInfoReducer(state = initialState, action) {
    switch (action.type) {
        case MARKET_INFO_RECEIVED:
            return Object.assign({}, state,
                {
                    marketInfoLoaded: true,
                    marketInfo: action.marketInfo
                });

        default:
            return state;
    }
}

export default marketInfoReducer;