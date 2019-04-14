const mapper = (iterable, mappingFunction, concurrency = Infinity) =>
  new Promise((resolve, reject) => {
    const results = []
    const iterator = iterable[Symbol.iterator]()
    let isRejected = false
    let isIterableComplete = false
    let resolvingCount = 0
    let currentIndex = 0

    const next = () => {
      if (isRejected) {
        return
      }

      const nextItem = iterator.next()
      const i = currentIndex
      currentIndex++

      if (nextItem.done) {
        isIterableComplete = true

        if (resolvingCount === 0) {
          resolve(results)
        }
        return
      }

      resolvingCount++

      return Promise.resolve(nextItem.value)

        .then(async element => {
          try {
            return await mappingFunction(element, i)
          } catch (err) {
            isRejected = true
            return reject(err)
          }
        })
        .then(value => {
          results[i] = value
          resolvingCount--
          return next()
        })
    }

    for (let i = 0; i < concurrency; i++) {
      next()

      if (isIterableComplete) {
        break
      }
    }
  })

module.exports = mapper
