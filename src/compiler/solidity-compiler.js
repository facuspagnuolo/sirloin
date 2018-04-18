import solc from 'solc'
import FileSystem from '../file_system/file-system'

export default class SolidityCompiler {
  constructor(contracts, optimized = true) {
    this.errors = []
    this.contracts = contracts
    this.optimized = optimized
    this.solcOutput = {}
  }

  call() {
    this._compile()
    return this._buildContractsData()
  }

  _compile() {
    const optimizer = this.optimized ? 1 : 0
    const sources = this._buildSources()
    this.solcOutput = solc.compile({sources}, optimizer, this._findDependency)
    if (this.solcOutput.errors) console.log('\n', this.solcOutput.errors)
  }

  _buildSources() {
    return this.contracts.reduce((sources, contract) => {
      console.log('Compiling', contract.fileName, '...')
      sources[contract.fileName] = contract.source()
      return sources
    }, {});
  }

  _findDependency(path) {
    const fileName = path.substring(path.lastIndexOf('/') + 1);
    let file = this.contracts.find(contract => contract.isCalled(fileName))
    if(!file) file = FileSystem.findFile(path)
    if(!file) return { error : 'File not found' }
    console.log('Compiling', fileName, '...')
    return { contents: file.source() }
  }

  _buildContractsData() {
    return Object.keys(this.solcOutput.contracts).map(key => {
      const [filePath, contractName] = key.split(':')
      return this._buildContractData(key, filePath, contractName);
    });
  }

  _buildContractData(key, filePath, contractName) {
    const fileName = filePath.substring(filePath.lastIndexOf('/') + 1);
    const output = this.solcOutput.contracts[key];
    const contract = this.contracts.find(contract => contract.isCalled(fileName))
    return {
      fileName,
      contractName,
      sourcePath: contract.filePath,
      source: contract.source(),
      sourceMap: output.srcmap,
      ast: this.solcOutput.sources[fileName].AST,
      abi: JSON.parse(output.interface),
      bytecode: "0x" + output.bytecode,
      compiler: {
        "name": "solc",
        "version": solc.version()
      }
    }
  }
}
