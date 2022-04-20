const accounts = [
  {
    name: 'a',
    address: 'secret1ucs35c2v7jwmjun5yjf94vjasn275aqa7e6eeh',
    mnemonic: 'zoo chat super danger original shell cabin blind sweet sad indoor test diesel try device corn follow leg hedgehog attract fix skate announce diesel'},
  { name: 'b',
    address: 'secret14m8fqygjmldtvllwxmvjxw97de7dfelwuzh29c',
    mnemonic: 'trend wide kit winner vacant afraid ceiling feel reject fan school another destroy fold discover inhale install coconut local candy option disorder fiber junk'
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
