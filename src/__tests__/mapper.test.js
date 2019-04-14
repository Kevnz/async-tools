const mapper = require('../mapper')
const delay = require('../delay')

describe('Reducing async functions', () => {
  it('should take a starting array and execute a mapping function on all items', async () => {
    const items = [1, 2, 3]
    const chain = await mapper(items, item => item * 100)
    expect(chain[0]).toBe(100)
    expect(chain[1]).toBe(200)
    expect(chain[2]).toBe(300)
  })

  it('should take a starting array and execute an async mapping function on array items', async () => {
    const start = Date.now()
    const asyncMapper = async item => {
      await delay(10)
      return item * 100
    }
    const items = [1, 2, 3]
    const chain = await mapper(items, asyncMapper)
    const end = Date.now()
    expect(end - start).toBeLessThan(50)
    expect(chain[0]).toBe(100)
    expect(chain[1]).toBe(200)
    expect(chain[2]).toBe(300)
  })
  it('should take a starting array with concurrency set to `1` and execute an async mapping function on array items one at a time', async () => {
    const start = Date.now()
    let executing = false
    const asyncMapper = async item => {
      if (executing) {
        throw new Error('Already running')
      }
      executing = true
      await delay(10)
      executing = false
      return item * 100
    }
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const chain = await mapper(items, asyncMapper, 1)
    const end = Date.now()
    expect(chain[0]).toBe(100)
    expect(end - start).toBeGreaterThan(100)
  })
  it('should take a starting array with concurrency set to `2` and execute an async mapping function on array items two at a time', async () => {
    const start = Date.now()
    let executing = 0
    const asyncMapper = async item => {
      if (executing > 1) {
        throw new Error('Already running')
      }
      executing++
      await delay(10)
      executing--
      return item * 100
    }
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const chain = await mapper(items, asyncMapper, 2)
    const end = Date.now()
    expect(chain[0]).toBe(100)
    expect(end - start).toBeGreaterThanOrEqual(50)
  })
  it('should take a starting array with concurrency set to `4` and execute an async mapping function on array items four at a time', async () => {
    const start = Date.now()
    let executing = 0
    const asyncMapper = async item => {
      if (executing > 3) {
        throw new Error(`Currently ${executing} functions running`)
      }
      executing++
      await delay(10)
      executing--
      return item * 100
    }
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const chain = await mapper(items, asyncMapper, 4)
    const end = Date.now()
    expect(chain[0]).toBe(100)
    expect(end - start).toBeGreaterThanOrEqual(30)
  })
})
