const composer = require('../composer')
const holder = require('../holder')
const delay = require('../delay')

describe('Composer to compose functions', () => {
  const func1 = val => val.toUpperCase()
  const func2 = val => `${val}-${val}`
  const func3 = val => `${val}!!!`
  it('should take `N` functions and return one function to execute on a value', async () => {
    const chain = composer(func1, func2, func3)
    const result = await chain('dude')
    expect(result).toBe('DUDE-DUDE!!!')
  })
  it('should take a starting value and execute an array of functions', async () => {
    const chain = composer(func1, func2, func3, func2)
    const result = await chain('dude')
    expect(result).toBe('DUDE-DUDE!!!-DUDE-DUDE!!!')
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
  it('should take 3 functions as parameters and execute them on a value', async () => {
    const chain = await composer(asyncFunc1, asyncFunc2, asyncFunc3)
    const result = await chain('dude')
    expect(result).toBe('DUDE-DUDE!!!')
  })
  it('should take 4 functions as parameters and execute them on a value', async () => {
    const chain = await composer(asyncFunc1, asyncFunc2, asyncFunc3, func2)
    const result = await chain('dude')
    expect(result).toBe('DUDE-DUDE!!!-DUDE-DUDE!!!')
  })

  const heldFunction1 = async (val, other) => {
    await delay(5)
    return func3(`${val}-${other}`)
  }

  const heldFunction2 = async (val, other, other2) => {
    await delay(5)
    return func3(`${val}-${other}-${other2}`)
  }
  describe('Holder function', () => {
    it('should take a function and parameter then execute the function with all parameters', async () => {
      const chain = await composer(
        asyncFunc1,
        asyncFunc2,
        asyncFunc3,
        holder(heldFunction1, 'BOOM')
      )
      const result = await chain('dude')
      expect(result).toBe('DUDE-DUDE!!!-BOOM!!!')
    })
    it('should take a function and parameters and execute the function with all parameters', async () => {
      const chain = await composer(
        asyncFunc1,
        asyncFunc2,
        asyncFunc3,
        holder(heldFunction1, 'BOOM'),
        holder(heldFunction2, 'BOOM', 'BANG')
      )
      const result = await chain('dude')
      expect(result).toBe('DUDE-DUDE!!!-BOOM!!!-BOOM-BANG!!!')
    })
    it('should take a function and parameters and execute the function with all parameters', async () => {
      const anAsyncFunction = async val => {
        await delay(10)
        return val + 1
      }
      const anotherAsyncFunction = async (val, secondValue) => {
        await delay(10)
        return val + secondValue
      }

      const asyncChain = composer(
        anAsyncFunction,
        holder(anotherAsyncFunction, 3),
        anAsyncFunction
      )
      const result = await asyncChain(0)
      expect(result).toBe(5)
    })
  })
})
