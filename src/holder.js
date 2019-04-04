module.exports = (func, ...params) => {
  return val => func(val, ...params)
}
