/**
 * Execute an array of async functions in order
 * passing the result of each function to the next
 *
 * @async
 * @function reducer
 * @param  {*} startValue - The starting value
 * @param  {function[]} funcs - The async functions to execute
 * @returns {*} - The final value from the functions
 *
 * @example
 *
 * const results = await reducer(0,
 *   asyncFunction,
 *   asyncFunction2,
 *   asyncFunction3
 * )
 */
module.exports = (startValue, ...funcs) =>
  new Promise((resolve, reject) => {
    const iterator = funcs[Symbol.iterator]()
    const next = async total => {
      const el = iterator.next()

      if (el.done) {
        resolve(total)
        return
      }
      try {
        const result = await el.value(total)
        next(result)
      } catch (error) {
        return reject(error)
      }
    }

    next(startValue)
  })
