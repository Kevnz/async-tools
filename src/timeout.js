module.exports = async (func, label = 'Timeout', time = 100) =>
  new Promise(async (resolve, reject) => {
    const timer = setTimeout(() => {
      return reject(new Error(`Timeout Error: ${label}`))
    }, time)
    const result = await func()
    clearTimeout(timer)
    return resolve(result)
  })
