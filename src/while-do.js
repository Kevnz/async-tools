/**
 * While a condition is true execute an async function
 *
 * @async
 * @function whileDo
 * @param  {function} condition - The condition function to check
 * @param  {function} func - An async function to execute
 *
 * @example
 * const results = await doWhile(async () => {
 *   await asyncFunction()
 * }, () => something === true)
 */
const whileDo = async (condition, func) => {
  if (condition()) {
    await func()
    return whileDo(condition, func)
  }
}

module.exports = whileDo
