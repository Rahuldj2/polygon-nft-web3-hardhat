require("@nomicfoundation/hardhat-toolbox");

const fs=require("fs")
const privateKey= fs.readFileSync(".secret").toString()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  networks:{
    hardhat:{
      chainId:1337
    },
    mumbai: {
      //do with env projectID
      url:"https://polygon-mumbai.infura.io/v3/a8742ffc372a4c9c9f6b52f0e9ab7362",
      accounts:[privateKey]
    },
    mainnet:{
      url:"https://polygon-mainnet.infura.io/v3/a8742ffc372a4c9c9f6b52f0e9ab7362",
      accounts:[privateKey]
    }
  },
  solidity: "0.8.19",
};
