const defaults = {
  concurrency: Infinity,
}

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
        .then(element => mappingFunction(element, i))
        .then(
          value => {
            results[i] = value
            resolvingCount--
            return next()
          },
          error => {
            isRejected = true
            return reject(error)
          }
        )
    }

    for (let i = 0; i < concurrency; i++) {
      next()

      if (isIterableComplete) {
        break
      }
    }
  })

module.exports = mapper
