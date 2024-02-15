require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const accounts = {
  mnemonic: process.env.MNEMONIC
};

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.13",
};
