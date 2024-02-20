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
    polygonAmoy: { //Sepolia
      url: "https://polygon-amoy.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: accounts
    },
    polygonZkEVMTestnet: { //Goerli based, TB deprecated
      url: "https://rpc.public.zkevm-test.net",
      accounts: accounts
    },
    celoAlfajores: { //Testnet
      url: "https://celo-alfajores.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: accounts
    },
    arbitrumSepolia: {
      url: "https://arbitrum-sepolia.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: accounts
    },
    avalancheTestnet: { //Fuji (C-Chain), built on top of Avalanche mainnet
      url: "https://avalanche-fuji.infura.io/v3/" + process.env.INFURA_KEY,
      accounts: accounts
    }
  },
  solidity: {
    version: "0.8.13"
  }
}