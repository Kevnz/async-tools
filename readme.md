# Async Tools

This is a collection of utility functions for working with async/await code.

## Install

```
npm install @kev_nz/async-tools
```

## Usage

### Delay

The delay method allows you to use wait a number of milliseconds before continuing the exection of your code.

```javascript
const { delay } = require('@kev_nz/async-tools')

(async () => {
  await delay(100)
  console.info('~100 milliseconds later')
})()

```

### Mapper

Execute an asynchronous mapping function over an array of returning the result.

```javascript
const { mapper } = require('@kev_nz/async-tools')

(async () => {

  const items = [1, 2, 3]
  const mappedItems = await mapper(items, anAsynchronousFunction)
})()
```

### Reducer

Execute an asynchronous mapping function over an array of returning the result.

```javascript
const { reducer } = require('@kev_nz/async-tools')

(async () => {
  const items = [1, 2, 3]
  const mappedItems = await mapper(items, anAsynchronousFunction)
})()
```

### Each

Execute an asynchronous function over an array one item at a time.

```javascript
const { mapper } = require('@kev_nz/async-tools')

(async () => {
  const items = [1, 2, 3]
  const [first, second, third] = await mapper(items, anAsyncFunction)
})()
```