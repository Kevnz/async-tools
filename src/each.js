const mapper = require('./mapper')

module.exports = (iterable, mappingFunction) => {
  return mapper(iterable, mappingFunction, 1)
}
