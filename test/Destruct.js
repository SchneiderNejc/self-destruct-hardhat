const {
    time,
    loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Self Destruct", function () {

    async function deployContracts() {
        const [owner, user] = await ethers.getSigners(); // Access the first signer from the array

        var initSupply = 10 ** 6;
        const GLDToken = await ethers.getContractFactory("GLDToken");
        const token = await GLDToken.deploy(initSupply);

        const Destruct = await ethers.getContractFactory("Destruct");
        const destruct = await Destruct.deploy(token.target);

        return { owner, user, token, destruct, initSupply };
    }

    describe("Deployment", function () {
        it("Should set the correct owner", async function () {
            const { owner, destruct } = await loadFixture(deployContracts);
            expect(await destruct.owner()).to.equal(owner.address); // Compare with the address of the owner
        });
        it("Owner should receive funds", async function () {
            const { owner, token, initSupply } = await loadFixture(deployContracts);
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

    describe("Deposits", function () {
        it("Should deposit tokens", async function () {
            const { token, destruct } = await loadFixture(deployContracts);

            let tokensToSend = 5000;
            await token.transfer(destruct.target, tokensToSend);

            destructTokenBalance = parseInt(await token.balanceOf(destruct.target));
            
            expect(destructTokenBalance).to.equal(tokensToSend);
        });
        it("Should deposit ether", async function () {
            const { owner, destruct } = await loadFixture(deployContracts);

            const amountEther = ethers.parseEther("5");
            await owner.sendTransaction({ to: destruct.target, value: amountEther });

            const destructEtherBalance = ethers.formatEther(await ethers.provider.getBalance(destruct.target));

            expect(destructEtherBalance).to.equal(ethers.formatUnits(amountEther, "ether"));
        });
    });

    describe("Withdrawals", function () {
        it("Should receive ether", async function () {
            const { owner, destruct } = await loadFixture(deployContracts);

            //send ether to contract
            const ethersToSend = ethers.parseEther("20");
            await owner.sendTransaction({ to: destruct.target, value: ethersToSend });

            let balanceBefore = await ethers.provider.getBalance(owner);            
            await destruct.destroy(owner);
            let balanceAfter = await ethers.provider.getBalance(owner);

            // Calculate expected balance after selfdestruct
            const expectedBalance = balanceBefore + ethersToSend;
            // Adjust for gas expenditure and rounding errors
            const margin = ethers.parseEther("0.01"); // Adjust the margin as needed
            const lowerBound = expectedBalance - margin;
            const upperBound = expectedBalance + margin;

            expect(balanceAfter).to.be.gte(lowerBound);
            expect(balanceAfter).to.be.lte(upperBound);
        });
        it("Should receive tokens", async function () {
            const { owner, token, destruct } = await loadFixture(deployContracts);

            //send tokens to contract
            let tokensToSend = 5000;
            await token.transfer(destruct.target, tokensToSend);
            let balanceBefore = parseInt(await token.balanceOf(owner));

            await destruct.destroy(owner);
            let balanceAfter = parseInt(await token.balanceOf(owner));

            expect(balanceAfter).to.equal(balanceBefore + tokensToSend);
        });
    });

    describe("Selfdestruct", function () {
        it("Should revert if called by non-owner", async function () {
            const { owner, user, destruct } = await loadFixture(deployContracts);

            await expect(destruct.connect(user).destroy(owner))
                .to.be.revertedWith("Caller is not the owner");
        });
        it("Should remove contract from the chain", async function () {
            const { owner, destruct } = await loadFixture(deployContracts);

            await destruct.destroy(owner);

            let code = await ethers.provider.getCode(destruct.target);

            expect(code).to.equal("0x");
        });
    });

    describe("Events", function () {
        it("Should emit an event on selfdestruct", async function () {
            const { owner, token, destruct } = await loadFixture(deployContracts);

            //send tokens to contract
            let tokensToSend = 500;
            await token.transfer(destruct.target, tokensToSend);
            //send ether to contract
            const ethersToSend = ethers.parseEther("20");
            await owner.sendTransaction({ to: destruct.target, value: ethersToSend });

            //const tx = await destruct.destroy(owner);
            await expect(destruct.destroy(owner)).to.emit(destruct, "Destroy")
                .withArgs(owner, ethersToSend, tokensToSend);
        });
    }); 

});