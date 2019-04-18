/**
 * Execute an async function over an iterable collection
 *
 * @function holder
 * @param  {function} func - The function that will be called
 * @param  {*} params - any parameters required for the function
 * @returns {function} - A function that takes a value and executes
 * the passed function with the value and other parameters
 * @example
 *
 * const asyncChain = composer(
 *   anAsyncFunction,
 *   holder(anotherAsyncFunction, 3),
 *   anAsyncFunction
 * )
 * const finalValue = await asyncChain(0)
 */
module.exports = (func, ...params) => {
  return val => func(val, ...params)
}
