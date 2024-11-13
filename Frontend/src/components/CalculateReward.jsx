import React, { useState } from "react";
import { ethers } from "ethers";

const CalculateReward = ({ contract }) => {
  const [reward, setReward] = useState(null);
  const [error, setError] = useState(null);

  const handleCalculateReward = async () => {
    try {
      const tx = await contract.calculateReward();
      // Assuming calculateReward returns a value directly
      const rewardAmount = await tx.wait(); // Wait for the transaction to be mined
      setReward(ethers.utils.formatEther(rewardAmount)); // Convert reward amount from wei to ether
      setError(null);
    } catch (error) {
      console.error("Error calculating reward:", error);
      setError("An error occurred while calculating reward. Please try again.");
      setReward(null);
    }
  };

  return (
    <div>
      <h3>Calculate Reward</h3>
      <button onClick={handleCalculateReward}>Calculate Reward</button>
      {reward !== null && <p>Your Reward: {reward} ETH</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CalculateReward;