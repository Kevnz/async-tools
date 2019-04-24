/**
 * Execute an async function while a condition is true
 *
 * @async
 * @function doWhile
 * @param  {function} func - An async function to execute
 * @param  {function} condition - The condition function to check
 *
 *
 * @example
 * const results = await doWhile(async () => {
 *   await asyncFunction()
 * }, () => something === true)
 */
const doWhile = async (func, condition) => {
  await func()

  if (condition()) {
    return doWhile(func, condition)
  }
}

module.exports = doWhile
