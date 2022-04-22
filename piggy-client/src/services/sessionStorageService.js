export const sessionStorageService = {
  get: (key) => {
    const item = sessionStorage.getItem(key)
    return item ? JSON.parse(item) : null
  },
  save: (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
    return value
  },
}
