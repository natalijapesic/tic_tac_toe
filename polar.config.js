const accounts = [
  {
    name: 'a',
    address: 'secret1s8c9p6vzxqucuh7s4egl9h62akpsnnuegppuy6',
    mnemonic: 'enlist spoil lake cactus lion toddler tooth design sorry arrow reflect crack want brown endless keen shoe captain sunny disagree pizza giraffe easy rocket'},
  { name: 'b',
    address: 'secret16jpy8nlezmd6nkv6sqa2a2rdflltf8xd3z8r9y',
    mnemonic: 'whisper sun floor awful peace pony noodle gate silent mistake spot seat civil crucial leaf taxi solid brown program author emerge false frequent jewel'
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
