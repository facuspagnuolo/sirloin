export const DEFAULT_NETWORK = 'development';

export const DEFAULT_SOLC_SETTINGS = {
  input: 'contracts',
  output: 'build',
  optimized: true,
}

export const DEFAULT_TX_PARAMS = {
  from: null,
  to: 0x0,
  gas: 6721975,
  gasLimit: 6721975,
  gasPrice: 100000000000,
}

export const DEFAULT_NETWORK_SETTINGS = {
  url: 'http://localhost:8545',
  txParams: DEFAULT_TX_PARAMS
}
