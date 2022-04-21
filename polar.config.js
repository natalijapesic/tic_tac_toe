const accounts = [
  {
    name: 'a',
    address: 'secret1w2d4l8868d38gsrcf9crgsn7utpvrtwj3kk0ty',
    mnemonic: 'swarm will dune snake page tree sign surge amount tumble squeeze false index version drift else special enter retreat world empower quality pudding print'},
  { name: 'b',
    address: 'secret1x00hksfvsdka4m7fxcx6umxdlwkrr2j64p76f6',
    mnemonic: 'chicken vital pond around safe vendor monkey post strike couple session equip camera soul kiss zebra horn roof voyage impose ethics expose crisp blast'
  }
];

const networks = {
  localnet: {
    endpoint: 'http://localhost:1337/',
    accounts: accounts,
  },
};

module.exports = {
  networks: {
    default: networks.localnet,
    
  },
  mocha: {
    timeout: 60000
  },
  rust: {
    version: "1.55.0",
  }
};
