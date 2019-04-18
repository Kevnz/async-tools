const mapper = require('./mapper')
/**
 * Execute an async function over an iterable collection one at a time
 *
 * @async
 * @function each
 * @param  {*} iterable - An iterable collection
 * @param  {function} mappingFunction - The async function to execute
 * @returns {*} - The mapped results
 *
 * @example
 *
 * const results = await each(
 *   [1,2,3,4,5],
 *   asyncFunction
 * )
 */
module.exports = (iterable, mappingFunction) => {
  return mapper(iterable, mappingFunction, 1)
}
