const delay = require('../delay')
const whileDo = require('../while-do')

describe('The WhileDo function', () => {
  it('should execute a function while a condition function is true', async () => {
    let inc = 0
    const condition = () => {
      inc++
      return inc < 100
    }
    const activity = async () => {
      await delay(10)
    }
    await whileDo(condition, activity)
    expect(inc).toBe(100)
  })
  it('should execute a function while a condition function is true and not execute it when it becomes false', async () => {
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
    await whileDo(condition, activity)
    expect(inc).toBe(100)
    expect(functionCount).toBe(99)
  })

  it('should not execute the function even one time if condition is not true', async () => {
    let inc = 0
    const condition = () => false
    const activity = async () => {
      inc++
      await delay(10)
    }
    await whileDo(condition, activity)
    expect(inc).toBe(0)
  })
})
