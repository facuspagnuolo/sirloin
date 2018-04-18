import fs from 'fs'
import path from 'path'

export default class FileItem {
  constructor(dir, fileName) {
    this.dir = dir
    this.fileName = fileName
    this.filePath = path.resolve(dir, fileName)
  }

  source() {
    const sources = fs.readFileSync(this.filePath)
    return "".concat(sources)
  }

  parseJson() {
    return JSON.parse(this.source())
  }

  ifDirectory(block) {
    if(this.isDirectory()) block()
  }

  ifSolidityFile(block) {
    if(this.isSolidityFile()) block()
  }

  isDirectory() {
    const stat = fs.statSync(this.filePath)
    return stat.isDirectory()
  }

  isCalled(name) {
    return this.fileName === name
  }

  isSolidityFile() {
    const solidityExtension = '.sol';
    const fileExtension = path.extname(this.fileName).toLowerCase();
    return fileExtension === solidityExtension
  }
}
