/**
 * Executes an async functions that will provide a
 * delay for the amount of time passed in
 *
 * @async
 * @function delay
 * @param  {number} time - The duration in milliseconds
 * @example
 * // wait 20  milliseconds
 * await delay(20)
 */
module.exports = time =>
  new Promise(resolve => setTimeout(() => resolve(), time))
