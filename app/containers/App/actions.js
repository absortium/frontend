/*
 * App Actions
 *
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */


import {
  LOG_IN,
  LOGGED_IN,
  LOG_OUT,
  LOGGED_OUT,
  ACCOUNT_RECEIVED,
  ACCOUNT_UPDATED,
  MARKET_CHANGED,
  MARKET_INFO_RECEIVED,
  MARKET_INFO_CHANGED,
  OFFERS_RECEIVED,
  OFFERS_CHANGED,
  TOPIC_SUBSCRIBE,
  TOPIC_UNSUBSCRIBE,
  TOPIC_UPDATE,
  TOPIC_SUBSCRIBE_SUCCESS,
  TOPIC_SUBSCRIBE_FAILED,
  EXCHANGE_CREATED,
  USER_EXCHANGE_HISTORY_RECEIVED,
  EXCHANGE_HISTORY_RECEIVED,
  EXCHANGE_HISTORY_CHANGED,
  WITHDRAWAL_CREATED,
  SEND_EXCHANGE,
  SEND_WITHDRAWAL,
  ACCOUNTS_EMPTY,
  DEPOSIT_ARRIVED
} from "./constants";

export function logIn() {
  return {
    type: LOG_IN
  };
}

export function logOut() {
  return {
    type: LOG_OUT
  };
}

export function loggedIn(token, profile) {
  return {
    type: LOGGED_IN,
    token,
    profile
  };
}

export function loggedOut() {
  return {
    type: LOGGED_OUT
  };
}

export function accountReceived(account) {
  return {
    type: ACCOUNT_RECEIVED,
    account: Object.assign({}, account)
  };
}

export function accountsEmpty() {
  return {
    type: ACCOUNTS_EMPTY
  };
}

export function accountUpdated(account) {
  return {
    type: ACCOUNT_UPDATED,
    account: Object.assign({}, account)
  };
}

export function marketChanged(from_currency, to_currency, pair, order_type) {
  return {
    type: MARKET_CHANGED,
    from_currency,
    to_currency,
    pair,
    order_type
  };
}

export function marketInfoReceived(marketInfo) {
  return {
    type: MARKET_INFO_RECEIVED,
    marketInfo: Object.assign({}, marketInfo)
  };
}

export function offerReceived(offers) {
  return {
    type: OFFERS_RECEIVED,
    offers: Object.assign([], offers)
  };
}

export function offersChanged(offers) {
  return {
    type: OFFERS_CHANGED,
    offers
  };
}

export function subscribeOnTopic(topic) {
  return {
    type: TOPIC_SUBSCRIBE,
    topic
  };
}

export function unsubscribeFromTopic(topic) {
  return {
    type: TOPIC_UNSUBSCRIBE,
    topic
  };
}

export function subscribeSuccess(topic) {
  return {
    type: TOPIC_SUBSCRIBE_SUCCESS,
    topic
  };
}

export function subscribeFailed(topic, error = null) {
  return {
    type: TOPIC_SUBSCRIBE_FAILED,
    topic,
    error
  };
}

export function topicUpdate(topic, data) {
  return {
    type: TOPIC_UPDATE,
    topic,
    data
  };
}

export function sendExchange(pair, order_type, amount, total, price) {
  return {
    type: SEND_EXCHANGE,
    pair,
    order_type,
    amount,
    total,
    price
  };
}

export function exchangeCreated(exchanges) {
  return {
    type: EXCHANGE_CREATED,
    exchanges: Object.assign([], exchanges)
  };
}

export function exchangesHistoryChanged(exchanges) {
  return {
    type: EXCHANGE_HISTORY_CHANGED,
    exchanges: Object.assign([], exchanges)
  };
}

export function sendWithdrawal(amount, address, currency) {
  return {
    type: SEND_WITHDRAWAL,
    amount,
    address,
    currency
  };
}

export function withdrawalCreated(withdrawal) {
  return {
    type: WITHDRAWAL_CREATED,
    withdrawal: Object.assign({}, withdrawal)
  };
}

export function marketInfoChanged(marketInfo) {
  return {
    type: MARKET_INFO_CHANGED,
    marketInfo: Object.assign({}, marketInfo)
  };
}

export function userExchangesHistoryReceived(exchanges) {
  return {
    type: USER_EXCHANGE_HISTORY_RECEIVED,
    exchanges: Object.assign([], exchanges)
  };
}

export function exchangesHistoryReceived(exchanges) {
  return {
    type: EXCHANGE_HISTORY_RECEIVED,
    exchanges: Object.assign([], exchanges)
  };
}

export function depositArrived(deposit) {
  return {
    type: DEPOSIT_ARRIVED,
    deposit: Object.assign([], deposit)
  };
}
