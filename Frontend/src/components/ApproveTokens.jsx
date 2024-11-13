import React, { useState } from "react";
import { ethers } from "ethers";

const ApproveTokens = ({ contract }) => {
  const [spender, setSpender] = useState("");
  const [amount, setAmount] = useState("");

  const handleApprove = async () => {
    try {
      const tx = await contract.approve(spender, ethers.utils.parseUnits(amount, 18));
      await tx.wait();
      alert("Tokens approved successfully!");
    } catch (error) {
      console.error("Error approving tokens:", error);
      alert("Failed to approve tokens.");
    }
  };

  return (
    <div>
      <h3>Approve Tokens</h3>
      <input
        type="text"
        placeholder="Spender Address"
        value={spender}
        onChange={(e) => setSpender(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleApprove}>Approve</button>
    </div>
  );
};

export default ApproveTokens;
