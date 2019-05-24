const getWeb3 = require('../utils/getWeb3');
const validateUtil = require('../utils/validateUtil');
const chalk = require('chalk');

const signature = 'block <networkUrl> [blockHashOrNumber]';
const description = 'Gets info about a block.';
const help = chalk`
Given a network and a block number or block hash, retrieves the information for that block.

{red Eg:}

{blue > pocketh block mainnet 1}
\{
  "difficulty": "17171480576",
  "extraData": "0x476574682f76312e302e302f6c696e75782f676f312e342e32",
  "gasLimit": 5000,
  "gasUsed": 0,
  "hash": "0x88e96d4537bea4d9c05d12549907b32561d3bf31f45aae734cdc119f13406cb6",
  "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
  "miner": "0x05a56E2D52c817161883f50c441c3228CFe54d9f",
  "mixHash": "0x969b900de27b6ac6a67742365dd65f55a0526c41fd18e1b16f1a1215c2e66f59",
  "nonce": "0x539bd4979fef1ec4",
  "number": 1,
  "parentHash": "0xd4e56740f876aef8c010b86a40d5f56745a118d0906a34e69aec8c0db1cb8fa3",
  "receiptsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
  "size": 537,
  "stateRoot": "0xd67e4d450343046425ae4271474353857ab860dbc0a1dde64b41b5cd3a532bf3",
  "timestamp": 1438269988,
  "totalDifficulty": "34351349760",
  "transactions": [],
  "transactionsRoot": "0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421",
  "uncles": []
\}
`;

module.exports = {
  signature,
  description,
  register: (program) => {
    program
      .command(signature, {noHelp: true})
      .description(description)
      .on('--help', () => console.log(help))
      .action(async (networkUrl, blockHashOrNumber) => {

        // Input validation.
        if(!validateUtil.positiveInteger(blockHashOrNumber) && !validateUtil.bytes32(blockHashOrNumber))
          throw new Error(`Invalid blockHashOrNumber: ${blockHashOrNumber}`);

        const web3 = await getWeb3(networkUrl);

        if(!blockHashOrNumber) blockHashOrNumber = await web3.eth.getBlockNumber();
        const tx = await web3.eth.getBlock(blockHashOrNumber);
        console.log(`${ JSON.stringify(tx, null, 2) }`);
      });
  }
};
