const { each, delay } = require('@kev_nz/async-tools')

const anAsynchronousFunction = async item => {
  await delay(10)
  return item * item
}

;(async () => {
  const items = [1, 2, 3]
  const [first, second, third] = await each(items, anAsynchronousFunction)
  console.info('first, second, and third', first, second, third)
})()
