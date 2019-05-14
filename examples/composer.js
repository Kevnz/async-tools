const { composer, delay } = require('@kev_nz/async-tools')

const anAsyncFunction = async val => {
  await delay(10)
  return val + 1
}
const anotherAsyncFunction = async val => {
  await delay(10)
  return val + 2
}

;(async () => {
  const asyncChain = composer(
    anAsyncFunction,
    anotherAsyncFunction,
    anAsyncFunction
  )
  const finalValue = await asyncChain(0)
  console.info('finalValue', finalValue) // finalValue 4
})()
