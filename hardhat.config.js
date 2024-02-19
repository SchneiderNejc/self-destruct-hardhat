require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const accounts = {
  mnemonic: process.env.MNEMONIC
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  //defaultNetwork: "localhost",
  networks: {
    hardhat: {
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + process.env.INFURA_KEY,
      //chainId: 11155111,  //chainId is optional
      accounts: accounts //to deploy from second account, use [accounts[1]]
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: accounts
    },
    optimismSepolia: {
      url: "https://optimism-sepolia.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: accounts
    },
      accounts: accounts
    }
  },
  solidity: {
    version: "0.8.13",
  }
}