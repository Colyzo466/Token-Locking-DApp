import React, { useState } from "react";
import { ethers } from "ethers";

const LockTokens = ({ contract }) => {
  const [amount, setAmount] = useState("");
  const [optionIndex, setOptionIndex] = useState(0);

  const handleLockTokens = async () => {
    try {
      const tx = await contract.lockTokens(amount, optionIndex);
      await tx.wait();
      alert("Tokens locked successfully!");
    } catch (error) {
      console.error("Error locking tokens:", error);
      alert("An error occurred while locking tokens. Please try again.");
    }
  };

  return (
    <div>
      <h3>Lock Tokens</h3>
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <input
        type="number"
        placeholder="Option Index"
        value={optionIndex}
        onChange={(e) => setOptionIndex(e.target.value)}
      />
      <button onClick={handleLockTokens}>Lock Tokens</button>
    </div>
  );
};

export default LockTokens;