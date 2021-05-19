import { getQuotesByTickerURL } from './utils';

export const fetchBySymbol = url =>
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.YAHOO_FINANCE_API_KEY,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    },
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(res.statusText);
  });

export const fetchGainersLosers = url =>
  fetch(url, {
    method: 'GET',
    headers: {
      'x-rapidapi-key': process.env.YAHOO_FINANCE_API_KEY,
      'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    },
  }).then(res => {
    if (res.ok) {
      return res.json();
    }

    throw new Error(res.statusText);
  });
