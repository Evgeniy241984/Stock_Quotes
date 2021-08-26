const allowedTickers = ['amd', 'ibm', 'aapl'];
export default allowedTickers;

export function getDateFromUnixTimestamp(dt) {
  return new Date(dt * 1000).toLocaleDateString();
}

export const isFunction = func => typeof func === 'function';
