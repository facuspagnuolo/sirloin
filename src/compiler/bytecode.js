export default class Bytecode {
  constructor(binary) {
    this.binary = binary
  }

  isEmpty() {
    return this.binary === ""
  }

  ifEmpty(block) {
    if(this.isEmpty()) block()
  }

  hasUnlinkedVariables() {
    return this.unlinkedLibraries().length > 0
  }

  ifUnlinkedLibraries(block) {
    if(this.hasUnlinkedVariables()) block(this.unlinkedLibrariesNames())
  }

  unlinkedLibraries() {
    const regex = /__[^_]+_+/g;
    const unlinkedLibraries = this.binary.match(regex);
    return [...(new Set(unlinkedLibraries))]
  }

  unlinkedLibrariesNames() {
    return this.unlinkedLibraries()
      .map(rawName => rawName.replace(/_/g, ""))
      .sort()
  }
}
