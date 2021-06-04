export const NEW_YORK_STOCK = 'US';
export const LONDON_STOCK = 'GB';
export const SINGAPORE_STOCK = 'SG';

const allowedTickers = ['amd', 'ibm', 'aapl'];
export default allowedTickers;

export function getDateFromUnixTimestamp(dt) {
  return new Date(dt * 1000).toLocaleDateString();
}
