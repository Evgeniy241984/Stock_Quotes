export default function SearchByTicker() {
  return `<input
      type = "text" 
      value = "${window.dataStore.currentTicker}" 
      onchange = "window.performSearch(this.value);"
    />`;
}
