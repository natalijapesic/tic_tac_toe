const accounts = [
  {
    name: 'a',
    address: 'secret1a88guakfkeszwawv5htpjjwwueh2c0te2qqgxz',
    mnemonic: 'tide comfort omit tonight chest toast frown notable pear leopard room above bamboo pulse color chimney catch elbow recycle friend tribe feature humble spare'},
  { name: 'b',
    address: 'secret1mtz32fjr2fwzhdvg2y2aectmu9grqm6399trx2',
    mnemonic: 'attack runway script brain style real patient dove payment hundred gold obey stone correct penalty crack motor innocent police endorse atom hood oyster sun'
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
