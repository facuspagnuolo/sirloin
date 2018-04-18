import Network from "../network";
import Objects from "../helpers/objects";
import Bytecode from "../compiler/bytecode";
import Arguments from '../helpers/arguments'

export default class Contract {
  constructor(contractName, abi, bytecode, txParams) {
    this.abi = abi
    this.name = contractName
    this.txParams = txParams
    this.bytecode = new Bytecode(bytecode)
  }

  new() {
    this.bytecode.ifEmpty(() => { throw new Error(`A bytecode must be provided for contract ${this.name}.`); });
    this.bytecode.ifUnlinkedLibraries(libraries => { throw new Error(`${this.name} bytecode contains unlinked libraries: ${libraries.join(', ')}`); });

    const [args, givenTxParams] = Arguments.parse(Array.prototype.slice.call(arguments))
    const txParams = Objects.merge(this.txParams, givenTxParams)
    if(!txParams.data) txParams.data = this.bytecode.binary

    const self = this
    return new Promise(function(resolve, reject) {
      const contractClass = Network.contract(self.abi);
      contractClass.new(args, txParams, function(error, instance) {
        if(error) reject(error);
        else if(instance && instance.address) resolve(instance);
      })
    })
  }

  at(address) {
    if(!Objects.isAddress(address)) throw new Error("Given address is not valid: " + address);
    return Network.contract(this.abi).at(address)
  }
}
