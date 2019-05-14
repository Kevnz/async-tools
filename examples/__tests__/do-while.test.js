const { doWhile, delay } = require('@kev_nz/async-tools')
describe('The DoWhile function', () => {
  it('should while a condition function is true execute an async function', async () => {
    let inc = 0
    const condition = () => inc < 100
    const activity = async () => {
      inc++
      await delay(10)
    }
    await doWhile(activity, condition)
    expect(inc).toBe(100)
  })

  it('should while a condition function is true execute an async function', async () => {
    let inc = 0
    let functionCount = 0
    const condition = () => {
      inc++
      return inc < 100
    }
    const activity = async () => {
      functionCount++
      await delay(10)
    }
    await doWhile(activity, condition)
    expect(inc).toBe(100)
    expect(functionCount).toBe(100)
  })
  it('should execute the function at least one time', async () => {
    let inc = 0
    const condition = () => false
    const activity = async () => {
      inc++
      await delay(10)
    }
    await doWhile(activity, condition)
    expect(inc).toBe(1)
  })
})
