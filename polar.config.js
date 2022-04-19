const accounts = [
  {
    name: 'a',
    address: 'secret1cfhxllwd5ku840wzk3zuh9xcync4svlnv27ayf',
    mnemonic: 'bubble viable steak just canoe range announce video april junk bless base neither second swamp lazy illegal script kiss obvious example pelican symptom hollow' },
  {
    name: 'b',
    address: 'secret18yac3wqw0f25wsjhffuf9f5wdaq7ttwnqpvl6d',
    mnemonic: 'nest tired bulb elephant combine file volume sick gasp link warm quote resemble toilet foster verify settle bench theory bamboo expose online globe antenna'  }
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
