const { delay } = require('@kev_nz/async-tools')

;(async () => {
  await delay(100)
  console.info('~100 milliseconds later')
})()
