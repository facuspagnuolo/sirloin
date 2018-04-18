import vm from "vm"
import Repl from "repl"
import Network from "./network";

class Console {
  constructor(input) {
    this.inputDir = input
  }

  start() {
    const repl = Repl.start({ prompt: "sirloin> "/*, eval: this._solvePromises*/ })
    repl.context.web3 = Network.web3()
    const artifacts = require('./contracts/artifacts')
    Object.keys(artifacts).forEach(contractName => {
      repl.context[contractName] = artifacts[contractName]
    })
  }

  _solvePromises(command, context, filename, callback) {

  }
}

module.exports = Console
