const { reducer, delay } = require('@kev_nz/async-tools')

const anAsyncFunction = async val => {
  await delay(10)
  return val + 1
}

;(async () => {
  const finalValue = await reducer(
    0,
    anAsyncFunction,
    anAsyncFunction,
    anAsyncFunction
  )
  console.info('finalValue', finalValue) // finalValue 3
})()
