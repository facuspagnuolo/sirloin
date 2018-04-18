import FileSystem from '../file_system/file-system'
import SolidityCompiler from './solidity-compiler'

class ProjectCompiler {
  constructor({ input, output, optimized = true }) {
    this.inputDir = input
    this.outputDir = output
    this.contracts = []
    this.optimized = optimized
    this.compilerOutput = []
  }

  call() {
    this._loadSoliditySourcesFromDir(this.inputDir)
    this._compile()
  }

  _loadSoliditySourcesFromDir(dir) {
    FileSystem.readDir(dir).forEach(file => {
      file.ifDirectory(() => this._loadSoliditySourcesFromDir(file.filePath))
      file.ifSolidityFile(() => this.contracts.push(file))
    })
  }

  _compile() {
    this.compilerOutput = new SolidityCompiler(this.contracts, this.optimized).call()
    FileSystem.createDir(this.outputDir);
    this.compilerOutput.forEach(data => {
      const buildFileName = `${this.outputDir}/${data.contractName}.json`
      FileSystem.writeJSON(buildFileName, data)
    })
  }
}

module.exports = ProjectCompiler
