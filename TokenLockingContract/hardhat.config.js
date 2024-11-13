require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUser Config */
module.exports = {
  solidity: "0.8.24",
  networks: {
    bscTestnet: {
      url: process.env.BSC_TESTNET_URL, // Ensure this environment variable is set correctly
      accounts: process.env.PRIVATE_KEY ? [`0x${process.env.PRIVATE_KEY}`] : [], // Check if PRIVATE_KEY is set
      chainId: 97, // BSC Testnet chain ID
      gas: 2100000, // Optional: set a gas limit
      gasPrice: 20000000000, // Optional: set a gas price (20 Gwei)
    },
  },
  etherscan: {
    apiKey: process.env.BSCSCAN_API_KEY
  },
  sourcify: {
    enabled: true // Enable Sourcify verification
  }
};