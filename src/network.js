import Web3 from 'web3';
import Configuration from "./configuration/configuration";

const Network = {
  contract(abi) {
    return this.eth().contract(abi)
  },

  sendTransaction(params) {
    return new Promise(function (resolve, reject) {
      Network.eth().sendTransaction(params, Network._callback(resolve, reject))
    });
  },

  accounts() {
    return this.eth().accounts;
  },

  defaultAccount() {
    return this.eth().defaultAccount;
  },

  eth() {
    return this.web3().eth;
  },

  web3() {
    const web3 = new Web3(this.provider());
    if(Configuration.txParams().from === null) web3.eth.defaultAccount = web3.eth.accounts[0]
    return web3
  },

  provider() {
    const provider = Configuration.networkURL();
    return new Web3.providers.HttpProvider(provider);
  },

  _callback(resolve, reject) {
    return function (error, value) {
      if (error) reject(error);
      else resolve(value);
    }
  }
}

module.exports = Network
