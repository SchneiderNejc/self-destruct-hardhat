// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

// Parameters setup
var initSupply = 10 ** 6; // One million (10^18 = convert wei to ether)

async function main() {
  const gldToken = await hre.ethers.deployContract("GLDToken", [initSupply]);
  await gldToken.waitForDeployment();
  console.log(`gldToken deployed to ${gldToken.target}`);

  const gameNft = await hre.ethers.deployContract("GameNft");
  await gameNft.waitForDeployment();
  console.log(`gameNft deployed to ${gameNft.target}`);

  const destruct = await hre.ethers.deployContract("Destruct", [gldToken.target]);
  await destruct.waitForDeployment();
  console.log(`destruct deployed to ${destruct.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
