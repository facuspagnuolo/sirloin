import BigNumber from 'bignumber.js'

const Objects = {
  merge(object, anotherObject) {
    return Object.assign({}, object, anotherObject)
  },

  isAddress(object) {
    return this.isString(object) && object.length === 42
  },

  isObjectAndNotBigNumber(object) {
    return this.isObject(object) && !this.isBigNumber(object)
  },

  isObject(object) {
    return typeof object === 'object'
  },

  isString(object) {
    return typeof object === 'string'
  },

  isBigNumber(object) {
    if (this.isObject(object)) return false;
    try {
      new BigNumber(object);
      return true;
    } catch(e) { return false; }
  }
}

module.exports = Objects
