const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const INITIAL_SUPPLY = 1_000_000; // Example initial supply
const REWARD_RATE = 5; // Example reward rate
const MIN_LOCK_TIME = 3600; // Example minimum lock time in seconds (1 hour)

module.exports = buildModule("TokenLockingModule", (m) => {
  const initialSupply = m.getParameter("initialSupply", INITIAL_SUPPLY);
  const rewardRate = m.getParameter("rewardRate", REWARD_RATE);
  const minLockTime = m.getParameter("minLockTime", MIN_LOCK_TIME);

  const tokenLocking = m.contract("TokenLocking", [initialSupply, rewardRate, minLockTime]);

  return { tokenLocking };
});