require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const accounts = {
  mnemonic: vars.get("MNEMONIC")
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  etherscan: {
    apiKey: {
      bscTestnet: process.env.BSC,
      sepolia: process.env.SEPOLIA
    }
  },
  //defaultNetwork: "localhost",
  networks: {
    // local networks
    hardhat: {
    },
    ganache: {
      url: 'http://127.0.0.1:9545'
    },
    // test networks
    sepolia: {
      url: "https://sepolia.infura.io/v3/" + vars.get("INFURA_KEY"),
      //chainId: 11155111,  //chainId is optional
      accounts: accounts //to deploy from second account, use [accounts[1]]
    },
    bscTestnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545/",
      accounts: accounts
    },
    optimismSepolia: {
      url: "https://optimism-sepolia.infura.io/v3/" + vars.get("INFURA_KEY"),
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
//TODO update this function to print the accounts from env mnemonic
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});