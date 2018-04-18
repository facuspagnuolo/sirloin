import Contract from "./contract";
import FileSystem from "../file_system/file-system";
import Configuration from "../configuration/configuration";

let contracts = {}
const inputDir = Configuration.solcSettings().output;

FileSystem.readDir(inputDir).forEach(file => {
  const json = file.parseJson()
  const contractName = json.contractName
  const contractObject = new Contract(json.contractName, json.abi, json.bytecode, Configuration.txParams())
  contracts[contractName] = contractObject
})

module.exports = contracts
