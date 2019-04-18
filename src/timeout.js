/**
 * Executes an async functions but will throw an error
 * if not complete in a certain amount of time
 *
 * @async
 * @function timeout
 * @param  {function} func - The async function to execute
 * @param  {string} [label='Timeout'] - The text for the error message
 * @param  {number} [time=100] - The duration in milliseconds
 *
 * @example
 * await timeout(() => asyncFunc(1), 'My Async Function', 20)
 */
module.exports = async (func, label = 'Timeout', time = 100) =>
  new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      return reject(new Error(`Timeout Error: ${label}`))
    }, time)
    const result = await func()
    clearTimeout(timer)
    return resolve(result)
  })
