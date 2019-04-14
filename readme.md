# Async Tools

[![npm version](https://badge.fury.io/js/%40kev_nz%2Fasync-tools.svg)](https://badge.fury.io/js/%40kev_nz%2Fasync-tools) ![Build Status](https://img.shields.io/circleci/project/github/Kevnz/async-tools/master.svg) [![Coverage Status](https://coveralls.io/repos/github/Kevnz/async-tools/badge.svg?branch=master)](https://coveralls.io/github/Kevnz/async-tools?branch=master)

This is a collection of utility functions for working with async/await code.

## Install

```
npm install @kev_nz/async-tools
```

## API Usage

Here are the functions provided. Additionally feel free to look at the tests in the project as well.

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
  // passing in an additional concurrency value specifies the number of async methods executed at a time
  const mappedItemsAgain = await mapper(items, anAsynchronousFunction, 2)
})()
```

### Reducer

Execute asynchronous reducer functions over a starting value.

```javascript
const { delay, reducer } = require('@kev_nz/async-tools')

const anAsyncFunction = async val => {
  await delay(10)
  return val + 1
}
(async () => {
  const finalValue = await reducer(0,
    anAsyncFunction,
    anAsyncFunction,
    anAsyncFunction
  )
  //finalValue 3
})()
```

### Each

Execute an asynchronous function over an array one item at a time.

```javascript
const { each } = require('@kev_nz/async-tools')

(async () => {
  const items = [1, 2, 3]
  const [first, second, third] = await each(items, anAsyncFunction)
})()
```

### Composer

Take number of functions and compose them together.

```javascript
const { composer } = require('@kev_nz/async-tools')

const anAsyncFunction = async val => {
  await delay(10)
  return val + 1
}
const anotherAsyncFunction = async val => {
  await delay(10)
  return val + 2
}

(async () => {
  const asyncChain = composer(
    anAsyncFunction,
    anotherAsyncFunction,
    anAsyncFunction
  )
  const finalValue = await asyncChain(0)
  //finalValue 4
})()
```

### Holder

When used with composer it lets you pass additional parameters to a function in the composed.

```javascript
const { composer, holder } = require('@kev_nz/async-tools')

const anAsyncFunction = async val => {
  await delay(10)
  return val + 1
}
const anotherAsyncFunction = async (val, secondValue) => {
  await delay(10)
  return val + secondValue
}

(async () => {
  const asyncChain = composer(
    anAsyncFunction,
    holder(anotherAsyncFunction, 3),
    anAsyncFunction
  )
  const finalValue = await asyncChain(0)
  //finalValue 5
})()
```

### Test Coverage

* [Coveralls](https://coveralls.io/github/Kevnz/async-tools?branch=master)
* [Coverage Results](http://kevinisom.info/async-tools/coverage/lcov-report/)
