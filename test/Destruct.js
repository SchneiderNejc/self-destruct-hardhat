const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Self Destruct", function () {

    async function deployContracts() {
        const [owner] = await ethers.getSigners(); // Access the first signer from the array

        var initSupply = 10 ** 6;
        const GLDToken = await ethers.getContractFactory("GLDToken");
        const token = await GLDToken.deploy(initSupply);

        const Destruct = await ethers.getContractFactory("Destruct");
        const destruct = await Destruct.deploy(token.target);

        return { owner, token, destruct, initSupply };
    }

    describe("Deployment", function () {
        it("Should set the correct owner", async function () {
            const { owner, destruct } = await loadFixture(deployContracts);
            console.log("Owner address:", owner.address);

            const actualAddress = await destruct.owner();
            console.log(actualAddress);
            expect(await destruct.owner()).to.equal(owner.address); // Compare with the address of the owner
        });
        it("Owner should receive funds", async function () {
            const { owner, token, initSupply } = await loadFixture(deployContracts);
            //console.log(ethers.getAddress("0"));
            expect(await token.balanceOf(owner.address)).to.equal(initSupply);
        });
        it("Should fail if token address is zero", async function () {
            const Destruct = await ethers.getContractFactory("Destruct");
            await expect(Destruct.deploy(ethers.ZeroAddress))
                .to.be.revertedWith("Cant be zero");
        });
        it("Should fail if token address is owner", async function () {
            const [owner] = await ethers.getSigners();
            const Destruct = await ethers.getContractFactory("Destruct");
            await expect(Destruct.deploy(owner.address))
                .to.be.revertedWith("Cant be owner");
        });
    });





});