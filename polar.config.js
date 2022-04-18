const accounts = [
  {
    name: 'a',
    address: 'secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03',
    mnemonic: 'snack cable erode art lift better october drill hospital clown erase address'
  },
  {
    name: 'b',
    address: 'secret1ap26qrlp8mcq2pg6r47w43l0y8zkqm8a450s03',
    mnemonic: 'sorry object nation also century glove small tired parrot avocado pulp purchase'
  }
];

const networks = {
  localnet: {
    endpoint: 'http://localhost:1337/',
    accounts: accounts,
  },
  // Pulsar-2
  testnet: {
    endpoint: 'http://testnet.securesecrets.org:1317/',
    chainId: 'pulsar-2',
    accounts: accounts,
  },
  development: {
    endpoint: 'tcp://0.0.0.0:26656',
    chainId: 'enigma-pub-testnet-3',
    types: {}
  },
  // Supernova Testnet
  supernova: {
    endpoint: 'http://bootstrap.supernova.enigma.co:1317',
    chainId: 'supernova-2',
    accounts: accounts,
    types: {},
    fees: {
      upload: {
          amount: [{ amount: "500000", denom: "uscrt" }],
          gas: "2000000",
      },
      init: {
          amount: [{ amount: "125000", denom: "uscrt" }],
          gas: "500000",
      },
    }
  }
};

module.exports = {
  networks: {
    default: networks.testnet,
    localnet: networks.localnet,
    development: networks.development
  },
  mocha: {
    timeout: 60000
  },
  rust: {
    version: "1.55.0",
  }
};
