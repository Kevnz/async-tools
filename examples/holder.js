const { composer, holder, delay } = require('@kev_nz/async-tools')

const anAsyncFunction = async val => {
  await delay(10)
  return val + 1
}
const anotherAsyncFunction = async (val, secondValue) => {
  await delay(10)
  return val + secondValue
}

;(async () => {
  const asyncChain = composer(
    anAsyncFunction,
    holder(anotherAsyncFunction, 3),
    anAsyncFunction
  )
  const finalValue = await asyncChain(0)
  console.info('finalValue', finalValue) // finalValue 5
})()
