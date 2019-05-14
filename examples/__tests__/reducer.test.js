const { reducer, delay } = require('@kev_nz/async-tools')

describe('Reducing async functions', () => {
  const func1 = val => val.toUpperCase()
  const func2 = val => `${val}-${val}`
  const func3 = val => `${val}!!!`
  it('should take a starting value and execute an array of functions', async () => {
    const chain = await reducer('dude', func1, func2, func3)
    expect(chain).toBe('DUDE-DUDE!!!')
  })
  const asyncFunc1 = async val => {
    await delay(5)
    return func1(val)
  }
  const asyncFunc2 = async val => {
    await delay(5)
    return func2(val)
  }
  const asyncFunc3 = async val => {
    await delay(5)
    return func3(val)
  }
  it('should take a starting value and execute an array of functions', async () => {
    const chain = await reducer('dude', asyncFunc1, asyncFunc2, asyncFunc3)
    expect(chain).toBe('DUDE-DUDE!!!')
  })
})
