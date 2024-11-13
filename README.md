# Token Locking DApp

## Overview

The Token Locking DApp enables users to securely lock their ERC20 tokens for specified durations, earning rewards based on lock periods. Users can choose various lock options, access tokens post-lock, and, if withdrawing early, incur predefined penalties. Built with Solidity for the smart contract and React for the frontend, this application ensures a seamless and secure user experience.

## Features

- **Token Locking**: Users can lock tokens for selected durations.
- **Rewards Mechanism**: Rewards are calculated based on the locked amount and duration.
- **Early Unlock Penalty**: Users can unlock tokens early with a penalty.
- **Admin Controls**: Contract owners can manage lock options, penalty rates, and withdraw Ether.
- **User Interface**: A React-based frontend for a user-friendly interaction with the smart contract.

## Smart Contract Details

The smart contract, written in Solidity, includes these key components:

- **Token Locking Logic**: Securely locks and unlocks tokens, calculating rewards based on lock period.
- **Lock Options**: Allows the owner to define various lock durations and reward rates.
- **Early Unlock Penalty**: Enforces penalties on early unlocks to deter premature withdrawals.
- **Event Emissions**: Emits events for actions such as locking, unlocking, reward calculations, and Ether withdrawals.

### Key Functions

- `addLockOption(uint256 duration, uint256 rate)`: Adds a lock option.
- `lockTokens(uint256 amount, uint256 optionIndex)`: Locks specified tokens.
- `unlockTokens()`: Unlocks tokens after lock expiration.
- `earlyUnlockTokens()`: Allows early unlock with a penalty.
- `withdrawEther()`: Enables contract owner to withdraw Ether.
- `updateEarlyUnlockPenaltyRate(uint256 newPenaltyRate)`: Modifies the early unlock penalty rate.

## Frontend Overview

Built with React and using ethers.js for Ethereum interaction, the frontend includes the following features:

- **Token Management**: Lock, unlock, and transfer tokens.
- **Admin Controls**: Add lock options, update penalty rates, and withdraw Ether.
- **Account Management**: Check token allowances and balances.

### Frontend Components

- `LockTokens`: Lock tokens based on lock options.
- `UnlockTokens`: Unlock tokens after the lock period.
- `AddLockOption`: Admin functionality to add lock options.
- `WithdrawEther`: Admin functionality for Ether withdrawal.
- `EarlyUnlockTokens`: Unlock tokens early with a penalty.
- `UpdatePenaltyRate`: Admin functionality to adjust penalty rates.
- `TransferTokens`: Transfer tokens directly.
- `ApproveTokens`: Approve token spending by the contract.
- `Allowance` & `BalanceOf`: Check token allowances and balances.
- `TokenInfo`: Display basic token information.

## Installation

To set up the DApp locally:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Colyzo466/token-locking-dapp.git
   cd token-locking-dapp
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Compile the Smart Contract**:
   Compile using your preferred Solidity tool (e.g., Hardhat, Truffle).

4. **Deploy the Smart Contract**:
   Deploy the contract to a local or test Ethereum network.

5. **Configure Frontend**:
   Update `config/TokenLockingABI.js` with the contract address and ABI.

6. **Start the Frontend**:
   ```bash
   npm start
   ```

## Usage

1. Connect your Ethereum wallet (e.g., MetaMask) to the DApp.
2. Lock and unlock tokens, add lock options, and manage your account using the interface.
3. Track transactions and rewards via the UI.

## License

This project is licensed under the MIT License. Refer to the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [OpenZeppelin](https://openzeppelin.com/) for secure smart contract libraries.
- [Ethers.js](https://docs.ethers.io/v5/) for simplifying blockchain interaction.

## Contributing

Contributions are welcome! Please fork this repository, create a branch, and submit a pull request with any improvements or fixes.
