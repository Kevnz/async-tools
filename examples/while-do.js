const { whileDo, delay } = require('@kev_nz/async-tools')
let something = true
let tick = 0

const asyncFunction = async () => {
  tick++
  something = tick < 10
  await delay(10)
}

;(async () => {
  await whileDo(() => something === true, () => asyncFunction())
})()
