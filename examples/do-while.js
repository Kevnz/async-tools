const { doWhile, delay } = require('@kev_nz/async-tools')
let something = true
let tick = 0

const asyncFunction = async () => {
  tick++
  something = tick < 10
  console.info('asyncFunction', tick)
  await delay(10)
}

;(async () => {
  await doWhile(() => asyncFunction(), () => something === true)
})()
