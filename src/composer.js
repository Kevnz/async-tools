const reducer = require('./reducer')
/**
 * Composer
 *
 * @param {*} funcs - The cunctions to chain
 * @returns a function chain
 *
 * @example
 *
 * const asyncChain = composer(
 *   anAsyncFunction,
 *   anotherAsyncFunction,
 *   anAsyncFunction
 * )
 * const finalValue = await asyncChain(0)
 */
module.exports = (...funcs) => {
  return val => reducer(val, ...funcs)
}
