import BigNumber from "bignumber.js";

export function sortOffers(offers) {
  function compare(a, b) {
    if (a.price.lessThan(b.price))
      return -1;
    if (a.price.greaterThan(b.price))
      return 1;
    return 0;
  }

  offers.sort(compare);
  return offers;
}

export function transform(offers) {
  let data = [];

  for (let offer of offers) {
    data.push({
      price: new BigNumber(offer.price),
      amount: new BigNumber(offer.amount),
      total: new BigNumber(offer.total)
    });
  }

  return data;
}

export function insertOffer(offer, offers) {
  let [index, isExist] = locationOfOffer(offer, offers);

  if (isExist) {
    if (offer.amount.isZero()) {
      // in case of zero amount we should delete offer
      offers.splice(index, 1);
    } else {
      // in case of non zero amount we should update offer with new one
      offers.splice(index, 1, offer);
    }
  } else {
    if (!offer.amount.isZero()) {
      // if offer not exist just insert it into sorted array
      offers.splice(index, 0, offer);
    }
  }

  return offers;
}

export function locationOfOffer(offer, offers, start, end) {
  start = start || 0;
  end = end || offers.length;

  var index = parseInt(start + (end - start) / 2, 10);

  if (offers.length == 0) return [index, false];

  if (offers[index].price.equals(offer.price)) return [index, true];

  if (end - start <= 1) return offers[index].price.greaterThan(offer.price) ? [index, false] : [index + 1, false];

  if (offers[index].price.lessThan(offer.price)) {
    return locationOfOffer(offer, offers, index, end);
  } else {
    return locationOfOffer(offer, offers, start, index);
  }
}