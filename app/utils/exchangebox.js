import {
  ERROR_FIELD_LT_ZERO,
  ERROR_FIELD_NOT_VALID,
  ERROR_FIELD_IS_REQUIRED
} from "containers/App/constants";
import {
  ERROR_RATE_LT_MIN,
  ERROR_RATE_GT_MAX,
  ERROR_GT_BALANCE,
  ERROR_TOTAL_LT_MIN,
  RATE_MAX,
  RATE_MIN,
  TOTAL_MIN,
  AMOUNT,
  TOTAL
} from "containers/ExchangeBox/constants";
import {
  errExist,
  genParam,
  isValid,
  isEmpty
} from "utils/general";
import BigNumber from "bignumber.js";

export function setTotal(_total, state, substate) {
  let error = null;
  let rate = state.rate.value;
  let isAccountExist = state.isAccountExist;

  if (!isEmpty(_total)) {
    if (isValid(_total)) {
      let total = new BigNumber(_total);

      if (total.greaterThan(TOTAL_MIN)) {
        if (!errExist(state.rate.error)) {
          let error = null;

          rate = new BigNumber(rate);

          let amount = total.dividedBy(rate);
          let notEnoughMoney = isAccountExist && amount.greaterThan(state.balance);

          if (notEnoughMoney) {
            error = ERROR_GT_BALANCE;
          } else if (amount.lessThan(0)) {
            error = ERROR_FIELD_LT_ZERO;
          }

          substate.amount = genParam(amount, error);
        }
      } else {
        error = ERROR_TOTAL_LT_MIN;
      }
    } else {
      error = ERROR_FIELD_NOT_VALID;
    }
  } else {
    substate.amount = genParam("", ERROR_FIELD_IS_REQUIRED);
    error = ERROR_FIELD_IS_REQUIRED;
  }

  substate.total = genParam(_total, error);
  substate.last_changed = TOTAL;
  return [error, substate]
}
export function setAmount(_amount, state, substate) {
  let error = null;
  let rate = state.rate.value;

  if (!isEmpty(_amount)) {
    if (isValid(_amount)) {
      let amount = new BigNumber(_amount);

      if (amount.greaterThanOrEqualTo(0)) {

        let enoughMoney = !(state.isAccountExist && amount.greaterThan(state.balance));

        if (enoughMoney) {
          if (!errExist(state.rate.error)) {
            let error = null;
            rate = new BigNumber(rate);

            let total = amount.times(rate);

            if (total.lessThan(TOTAL_MIN)) {
              error = ERROR_TOTAL_LT_MIN
            }

            substate.total = genParam(total, error);
          }
        } else {
          error = ERROR_GT_BALANCE
        }
      } else {
        error = ERROR_FIELD_LT_ZERO
      }
    } else {
      error = ERROR_FIELD_NOT_VALID;
    }
  } else {
    error = ERROR_FIELD_IS_REQUIRED;
    substate.total = genParam("", ERROR_FIELD_IS_REQUIRED);
  }

  substate.amount = genParam(_amount, error);
  substate.last_changed = AMOUNT;
  return [error, substate]
}
export function setRate(_rate, state, substate) {
  let error = null;
  let total = state.total.value;
  let amount = state.amount.value;
  let isAccountExist = state.isAccountExist;

  if (!isEmpty(_rate)) {
    if (isValid(_rate)) {
      let rate = new BigNumber(_rate);

      if (rate.lessThan(RATE_MAX)) {

        if (rate.greaterThanOrEqualTo(RATE_MIN)) {

          if (!errExist(state.amount.error)) {
            let error = null;

            amount = new BigNumber(amount);
            total = rate.times(amount);

            if (total.lessThan(TOTAL_MIN)) {
              error = ERROR_TOTAL_LT_MIN;
            }

            substate.total = genParam(total, error);

          } else if (!errExist(state.total.error)) {
            let error = null;

            total = new BigNumber(total);
            amount = total.divideBy(rate);

            let enoughMoney = !(isAccountExist && amount.greaterThan(state.balance));

            if (!enoughMoney) {
              error = ERROR_GT_BALANCE;
            } else if (amount.lessThan(0)) {
              error = ERROR_FIELD_LT_ZERO;
            }

            substate.amount = genParam(amount, error);
          }
        } else {
          error = ERROR_RATE_LT_MIN
        }
      } else {
        error = ERROR_RATE_GT_MAX
      }
    } else {
      error = ERROR_FIELD_NOT_VALID;
    }
  } else {
    error = ERROR_FIELD_IS_REQUIRED;
    substate.total = genParam("", ERROR_FIELD_IS_REQUIRED);
  }

  substate.rate = genParam(_rate, error);
  return [error, substate]
}