// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract TokenLocking is ERC20, Ownable, ReentrancyGuard {
    uint256 public rewardRate;
    uint256 public immutable minLockTime;
    uint256 public gracePeriod = 1 hours; // Grace period for withdrawal after lock expires
    uint256 public earlyUnlockPenaltyRate = 10; // Early unlock penalty rate in percentage

    struct UserCompartment {
        uint256 lockedAmount;
        uint256 lockStartTime;
        uint256 lockEndTime;
        bool isLocked;
    }

    struct LockOption {
        uint256 duration; // Lock duration in seconds
        uint256 rewardRate; // Reward rate for this option
    }

    mapping(address => UserCompartment) public compartments;
    LockOption[] public lockOptions;

    event TokensLocked(address indexed user, uint256 amount, uint256 lockTime, uint256 etherSent);
    event TokensUnlocked(address indexed user, uint256 amount);
    event RewardCalculated(address indexed user, uint256 reward);
    event EtherWithdrawn(address indexed owner, uint256 amount);
    event LockOptionAdded(uint256 duration, uint256 rewardRate);
    event EarlyUnlockPenaltyRateUpdated(uint256 newPenaltyRate);

    constructor(uint256 initialSupply, uint256 _rewardRate, uint256 _minLockTime) 
    ERC20("Token Lock", "TLK")
    Ownable(msg.sender) 
    
{
    _mint(msg.sender, initialSupply * 10 ** decimals());
    rewardRate = _rewardRate;
    minLockTime = _minLockTime;
}

    function addLockOption(uint256 duration, uint256 rate) external onlyOwner {
        require(duration >= minLockTime, "Lock time must be at least the minimum lock time");
        require(rate > 0, "Reward rate must be greater than zero");
        
        lockOptions.push(LockOption(duration, rate));
        emit LockOptionAdded(duration, rate);
    }

    function lockTokens(uint256 amount, uint256 optionIndex) external payable nonReentrant {
        require(amount > 0, "Amount must be greater than zero");
        require(optionIndex < lockOptions.length, "Invalid lock option");
        LockOption memory lockOption = lockOptions[optionIndex];
        require(!compartments[msg.sender].isLocked, "Tokens are already locked");
        require(allowance(msg.sender, address(this)) >= amount, "Token allowance too low");

        bool success = transferFrom(msg.sender, address(this), amount);
        require(success, "Token transfer failed");

        compartments[msg.sender] = UserCompartment({
            lockedAmount: amount,
            lockStartTime: block.timestamp,
            lockEndTime: block.timestamp + lockOption.duration,
            isLocked: true
        });

        emit TokensLocked(msg.sender, amount, lockOption.duration, msg.value);
    }

    function unlockTokens() external nonReentrant {
        UserCompartment storage compartment = compartments[msg.sender];
        require(compartment.isLocked, "No tokens are locked");
        require(block.timestamp >= compartment.lockEndTime, "Lock period not yet expired");
        require(block.timestamp <= compartment.lockEndTime + gracePeriod, "Unlock period expired");

        uint256 amount = compartment.lockedAmount;
        uint256 reward = calculateReward();

        if (reward > 0) {
            // Transfer rewards first before modifying state
            bool rewardSuccess = transfer(msg.sender, reward);
            require(rewardSuccess, "Reward transfer failed");
            emit RewardCalculated(msg.sender, reward);
        }

        // Update state before transferring tokens
        compartment.lockedAmount = 0;
        compartment.isLocked = false;

        bool success = transfer(msg.sender, amount);
        require(success, "Token transfer failed");
        emit TokensUnlocked(msg.sender, amount);
    }

    function earlyUnlockTokens() external nonReentrant {
        UserCompartment storage compartment = compartments[msg.sender];
        require(compartment.isLocked, "No tokens are locked");
        require(block.timestamp < compartment.lockEndTime, "Lock period already expired");

        uint256 penalty = (compartment.lockedAmount * earlyUnlockPenaltyRate) / 100; // Penalty based on rate
        uint256 amountAfterPenalty = compartment.lockedAmount - penalty;

        // Update state before transferring tokens
        compartment.lockedAmount = 0;
        compartment.isLocked = false;

        bool success = transfer(msg.sender, amountAfterPenalty);
        require(success, "Token transfer failed");
        transfer(owner(), penalty);
        emit TokensUnlocked(msg.sender, amountAfterPenalty);
    }

    function calculateReward() internal view returns (uint256) {
        UserCompartment memory compartment = compartments[msg.sender];
        uint256 lockDuration = compartment.lockEndTime - compartment.lockStartTime;
        uint256 reward = (compartment.lockedAmount * rewardRate * lockDuration) / (10 ** decimals());
        return reward;
    }

    function withdrawEther() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner()).transfer(balance);
        emit EtherWithdrawn(owner(), balance);
    }

    function updateEarlyUnlockPenaltyRate(uint256 newPenaltyRate) external onlyOwner {
        require(newPenaltyRate > 0, "Penalty rate must be greater than zero");
        earlyUnlockPenaltyRate = newPenaltyRate;
        emit EarlyUnlockPenaltyRateUpdated(newPenaltyRate);
    }
}