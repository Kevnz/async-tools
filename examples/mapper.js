const { mapper, delay } = require('@kev_nz/async-tools')

const anAsynchronousFunction = async item => {
  await delay(10)
  return item * item
}

;(async () => {
  const items = [1, 2, 3]
  const mappedItems = await mapper(items, anAsynchronousFunction)
  console.info('mappedItems', mappedItems) // 1, 4, 9

  // passing in an additional concurrency value specifies the number of async methods executed at a time
  const mappedItemsAgain = await mapper(items, anAsynchronousFunction, 2)
  console.info('mappedItemsAgain', mappedItemsAgain) // 1, 4, 9
})()
