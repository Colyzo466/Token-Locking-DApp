import React, { useState } from "react";
import { ethers } from "ethers";

const UpdatePenaltyRate = ({ contract }) => {
  const [newPenaltyRate, setNewPenaltyRate] = useState("");

  const handleUpdatePenaltyRate = async () => {
    try {
      const tx = await contract.updateEarlyUnlockPenaltyRate(newPenaltyRate);
      await tx.wait();
      alert("Early unlock penalty rate updated successfully!");
    } catch (error) {
      console.error("Error updating penalty rate:", error);
      alert("Failed to update penalty rate.");
    }
  };

  return (
    <div>
      <h3>Update Early Unlock Penalty Rate</h3>
      <input
        type="text"
        placeholder="New Penalty Rate (%)"
        value={newPenaltyRate}
        onChange={(e) => setNewPenaltyRate(e.target.value)}
      />
      <button onClick={handleUpdatePenaltyRate}>Update Penalty Rate</button>
    </div>
  );
};

export default UpdatePenaltyRate;