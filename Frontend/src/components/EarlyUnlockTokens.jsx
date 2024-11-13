import React from "react";
import { ethers } from "ethers";

const EarlyUnlockTokens = ({ contract }) => {
  const handleEarlyUnlockTokens = async () => {
    try {
      const tx = await contract.earlyUnlockTokens();
      await tx.wait();
      alert("Tokens unlocked successfully!");
    } catch (error) {
      console.error("Error unlocking tokens early:", error);
      alert("An error occurred while unlocking tokens. Please try again.");
    }
  };

  return (
    <div>
      <h3>Early Unlock Token</h3>
      <button onClick={handleEarlyUnlockTokens}>Unlock Tokens Early</button>
    </div>
  );
};

export default EarlyUnlockTokens;