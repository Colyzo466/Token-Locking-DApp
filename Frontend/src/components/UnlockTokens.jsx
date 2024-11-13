import React from "react";
import { ethers } from "ethers";

const UnlockedTokens = ({ contract }) => {
  try {
    const handleUnlockTokens = async () => {
      try {
        const tx = await contract.unlockTokens();
        await tx.wait();
        alert("Tokens unlocked successfully!");
      } catch (error) {
        console.error("Error unlocking tokens:", error);
        alert("Failed to unlock tokens. Please try again.");
      }
    };

    return (
      <div>
        <h3>Unlock Tokens</h3>
        <button onClick={handleUnlockTokens}>Unlock Tokens</button>
      </div>
    );
  } catch (error) {
    console.error("Error rendering UnlockedTokens component:", error);
    return <div>Error loading component. Please try again later.</div>;
  }
};

export default UnlockedTokens;