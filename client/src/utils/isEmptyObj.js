export function isEmptyObj (obj) {
  for (let i in obj) {
    return false
  }
  return true
}
