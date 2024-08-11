const useLocalStorage = target => {
  const item = window.localStorage.getItem(target)

  return item ?
    JSON.parse(item) : null
}

export { useLocalStorage }