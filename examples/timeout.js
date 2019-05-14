const { timeout, delay } = require('@kev_nz/async-tools')

const thingThatIsLongRunning = async () => {
  await delay(1000)
}

const thingThatIsNotAsLong = async () => {
  await delay(10)
}

;(async () => {
  try {
    await timeout(() => thingThatIsLongRunning(), 'Long Running Function')
  } catch (err) {
    console.error(err) // Timeout Error: Long Running Function
  }
  await thingThatIsNotAsLong() // no error
})()
