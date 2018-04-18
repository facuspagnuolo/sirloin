import Objects from '../helpers/objects'
import FileSystem from '../file_system/file-system'
import { DEFAULT_NETWORK, DEFAULT_NETWORK_SETTINGS, DEFAULT_SOLC_SETTINGS, DEFAULT_TX_PARAMS } from "./constants";

const Configuration = {
  network() {
    return global.network || DEFAULT_NETWORK
  },

  networkURL() {
    return this.networkSettings().url
  },

  txParams() {
    return this.networkSettings().txParams
  },

  networkSettings() {
    const networks = this.file().networks || {}
    const networkSettings = networks[this.network()] || {}
    const settings = Objects.merge(DEFAULT_NETWORK_SETTINGS, networkSettings)
    settings.txParams = Objects.merge(DEFAULT_TX_PARAMS, settings.txParams)
    return settings
  },

  solcSettings() {
    const solcSettings = this.file().solc;
    return Objects.merge(DEFAULT_SOLC_SETTINGS, solcSettings)
  },

  file() {
    const file = FileSystem.findFile('.sirloin')
    if(!file) throw Error('A .sirloin config file must be provided')
    return file.parseJson()
  },
}

module.exports = Configuration
