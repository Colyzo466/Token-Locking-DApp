import React, { useState } from "react";
import { ethers } from "ethers";

const TransferTokens = ({ contract }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    try {
      const tx = await contract.transfer(recipient, ethers.utils.parseUnits(amount, 18));
      await tx.wait();
      alert("Tokens transferred successfully!");
    } catch (error) {
      console.error("Error transferring tokens:", error);
      alert("Failed to transfer tokens.");
    }
  };

  return (
    <div>
      <h3>Transfer Tokens</h3>
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleTransfer}>Transfer</button>
    </div>
  );
};

export default TransferTokens;
