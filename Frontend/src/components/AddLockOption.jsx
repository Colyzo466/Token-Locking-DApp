import React, { useState } from "react";
import { ethers } from "ethers";

const AddLockOption = ({ contract }) => {
  const [duration, setDuration] = useState("");
  const [rewardRate, setRewardRate] = useState("");

  const handleAddLockOption = async () => {
    try {
      const tx = await contract.addLockOption(duration, rewardRate);
      await tx.wait();
      alert("Lock option added successfully!");
    } catch (error) {
      console.error("Error adding lock option:", error);
      alert("Failed to add lock option. Please try again.");
    }
  };

  return (
    <div>
      <h3>Add Lock Option</h3>
      <input
        type="text"
        placeholder="Duration (in seconds)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <input
        type="text"
        placeholder="Reward Rate"
        value={rewardRate}
        onChange={(e) => setRewardRate(e.target.value)}
      />
      <button onClick={handleAddLockOption}>Add Lock Option</button>
    </div>
  );
};

export default AddLockOption;

