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

/* export const fetchGainersLosers = () =>
  fetch(
    'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-movers?region=US&lang=en-US&start=0&count=6',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'a9fdd0137emsh297a5a07d2c5c40p1e91c2jsnd82fd69b8746',
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      },
    },
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    })
    .then(({ finance }) => finance)
    .then(({ result }) => result); */

/* export const fetchQuotes = () =>
  fetch(
    'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=AMD%2CIBM%2CAAPL',
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'a9fdd0137emsh297a5a07d2c5c40p1e91c2jsnd82fd69b8746',
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      },
    },
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    })
    .then(({ quoteResponse }) => quoteResponse)
    .then(({ result }) => console.log({ result }));

/* export const fetchTopTranding = () =>
  fetch("https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/get-trending-tickers?region=SG", {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "a9fdd0137emsh297a5a07d2c5c40p1e91c2jsnd82fd69b8746",
      "x-rapidapi-host": "apidojo-yahoo-finance-v1.p.rapidapi.com"
    },
  })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    })
    .then(({ finance }) => finance);
 */

/* .then(({ result }) => console.log({ result })); */

/*  export const fetchByTicker2 = ()=> {
  fetch(
    `"https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes?region=US&symbols=amd"`,
    {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'a9fdd0137emsh297a5a07d2c5c40p1e91c2jsnd82fd69b8746',
        'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
      },
    },
  )
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      throw new Error(res.statusText);
    })
}

  fetchByTicker2(); */
