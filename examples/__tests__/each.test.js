const { each, delay } = require('@kev_nz/async-tools')

describe('Each async function', () => {
  it('should take an array and execute an async function on array items one at a time', async () => {
    const start = Date.now()
    const asyncMapper = async item => {
      await delay(10)
      return item * 100
    }
    const items = [1, 2, 3]
    const [first, second, third] = await each(items, asyncMapper)
    const end = Date.now()
    expect(end - start).toBeGreaterThanOrEqual(30)
    expect(first).toBe(100)
    expect(second).toBe(200)
    expect(third).toBe(300)
  })
})
