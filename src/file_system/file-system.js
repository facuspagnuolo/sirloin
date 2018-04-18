import fs from 'fs'
import FileItem from './file-item'

const FileSystem = {
  readDir(dir) {
    const files = fs.readdirSync(dir)
    return files.map(file => new FileItem(dir, file))
  },

  createDir(dir) {
    if(!fs.existsSync(dir)) fs.mkdirSync(dir);
  },

  writeJSON(file, object) {
    fs.writeFileSync(file, JSON.stringify(object, null, 2), { flag: 'w' })
  },

  findFile(path) {
    const fileName = path.substring(path.lastIndexOf('/') + 1);
    const files = this.readDir(process.cwd());
    for(let i = 0; i < files.length; i++) {
      const file = files[i]
      if(file.isCalled(fileName)) return file
      if(file.isDirectory()) {
        const result = this._findFile(file, fileName);
        if(result) return result
      }
    }
  },

  _findFile(file, fileName) {
    if(file.isCalled(fileName)) return file
    else if(file.isDirectory()) {
      this.readDir(file.filePath).forEach(file => {
        const result = this._findFile(file, fileName)
        if(result) return result
      })
    }
  }
}

export default FileSystem
