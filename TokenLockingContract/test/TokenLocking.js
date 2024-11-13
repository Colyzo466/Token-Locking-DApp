const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("TokenLocking", function () {
  async function deployTokenLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_TOKEN = ethers.utils.parseUnits("1", 18); // Assuming the token has 18 decimals

    const lockedAmount = ONE_TOKEN; // Amount of tokens to lock
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECS;

    const [owner, otherAccount] = await ethers.getSigners();

    // Assuming an ERC20 token contract is deployed and we have its instance
    const Token = await ethers.getContractFactory("YourToken"); // Replace with your token contract
    const token = await Token.deploy(); // Deploy the token contract

    const TokenLocking = await ethers.getContractFactory("TokenLocking");
    const tokenLocking = await TokenLocking.deploy(token.address, unlockTime);

    // Transfer tokens to the lock contract
    await token.transfer(tokenLocking.address, lockedAmount);

    return { tokenLocking, token, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    it("Should set the right unlockTime", async function () {
      const { tokenLocking, unlockTime } = await loadFixture(deployTokenLockFixture);
      expect(await tokenLocking.unlockTime()).to.equal(unlockTime);
    });

    it("Should set the right owner", async function () {
      const { tokenLocking, owner } = await loadFixture(deployTokenLockFixture);
      expect(await tokenLocking.owner()).to.equal(owner.address);
    });

    it("Should receive and store the tokens to lock", async function () {
      const { tokenLocking, token, lockedAmount } = await loadFixture(deployTokenLockFixture);
      expect(await token.balanceOf(tokenLocking.address)).to.equal(lockedAmount);
    });

    it("Should fail if the unlockTime is not in the future", async function () {
      const latestTime = await time.latest();
      const TokenLocking = await ethers.getContractFactory("TokenLocking");
      await expect(TokenLocking.deploy("0xYourTokenAddress", latestTime)).to.be.revertedWith(
        "Unlock time should be in the future"
      );
    });
  });

  describe("Withdrawals", function () {
    describe("Validations", function () {
      it("Should revert with the right error if called too soon", async function () {
        const { tokenLocking } = await loadFixture(deployTokenLockFixture);
        await expect(tokenLocking.withdraw()).to.be.revertedWith("You can't withdraw yet");
      });

      it("Should revert with the right error if called from another account", async function () {
        const { tokenLocking, unlockTime, otherAccount } = await loadFixture(deployTokenLockFixture);
        await time.increaseTo(unlockTime);
        await expect(tokenLocking.connect(otherAccount).withdraw()).to.be.revertedWith("You aren't the owner");
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { tokenLocking, unlockTime } = await loadFixture(deployTokenLockFixture);
        await time.increaseTo(unlockTime);
        await expect(tokenLocking.withdraw()).not.to.be.reverted;
      });
    });

    describe("Events", function () {
      it("Should emit an event on withdrawals", async function () {
        const { tokenLocking, unlockTime, lockedAmount } = await loadFixture(deployTokenLockFixture);
        await time.increaseTo(unlockTime);
        await expect(tokenLocking.withdraw())
          .to.emit(tokenLocking, "Withdrawal")
          .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
      });
    });

    describe("Transfers", function () {
      it("Should transfer the tokens to the owner", async function () {
        const { tokenLocking, unlockTime, lockedAmount, owner, token } = await loadFixture(deployTokenLockFixture);
        await time.increaseTo(unlockTime);
        await expect(tokenLocking.withdraw()).to.changeTokenBalances(
          token,
          [owner, tokenLocking],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });
});