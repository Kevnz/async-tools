const { timeout, delay } = require('@kev_nz/async-tools')

describe('timeout async functions', () => {
  const func1 = val => val.toUpperCase()
  const func2 = val => `${val}-${val}`

  const shortCall = async val => {
    await delay(5)
    return func1(val)
  }
  const longCall = async val => {
    await delay(50)
    return func2(val)
  }

  it('should return the value of the call in the timeout function', async () => {
    const result = await timeout(() => shortCall('test'))
    expect(result).toBe('TEST')
  })

  it('should throw a timeout error', async () => {
    expect(timeout(() => longCall('test'), 'Long Call', 10)).rejects.toThrow(
      'Timeout Error: Long Call'
    )
  })
  const tryThis = async () => {
    try {
      await timeout(() => longCall('test'), 'Long Call', 10)
      return false
    } catch (terr) {
      expect(terr.message).toBe('Timeout Error: Long Call')
      return true
    }
  }
  it('should throw the timeout error', async () => {
    const result = await tryThis()
    expect(result).toBe(true)
  })
})
