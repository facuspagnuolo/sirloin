import Objects from './objects'

const Arguments = {
  parse(params = []) {
    let txParams = {}
    if(params.length > 0) {
      const lastArg = params[params.length - 1];
      if(Objects.isObjectAndNotBigNumber(lastArg)) txParams = params.pop();
    }
    return [params, txParams]
  }
}

module.exports = Arguments
