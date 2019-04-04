const delay = require('../delay')

describe('The delay function', () => {
  it('should wait `20` milliseconds', async () => {
    let ticks = 0
    const ticker = setInterval(() => {
      ticks++
    }, 1)
    await delay(20)
    expect(ticks).toBeGreaterThan(8)
    expect(ticks).toBeLessThan(20)
    clearTimeout(ticker)
  })
  it('should provide a delay of `2` milliseconds', async () => {
    let ticks = 0
    const ticker = setInterval(() => {
      ticks++
    }, 1)
    await delay(2)
    expect(ticks).toBeGreaterThan(0)
    expect(ticks).toBeLessThan(3)
    clearTimeout(ticker)
  })
})
