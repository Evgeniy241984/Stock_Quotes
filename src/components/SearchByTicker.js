/** @jsx createElement */
/** @jsxFrag createFragment */
import { createElement } from '../framework';

function SearchByTicker({ value, onChange }) {
  return <input type="text" value={value} onChange={e => onChange(e.target.value)} />;
}

export default SearchByTicker;
