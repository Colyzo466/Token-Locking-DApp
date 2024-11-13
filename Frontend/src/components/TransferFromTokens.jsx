import React, { useState } from "react";
import { ethers } from "ethers";

const TransferFromTokens = ({ contract }) => {
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransferFrom = async () => {
    try {
      const tx = await contract.transferFrom(sender, recipient, ethers.utils.parseUnits(amount, 18));
      await tx.wait();
      alert("Tokens transferred successfully!");
    } catch (error) {
      console.error("Error transferring tokens:", error);
      alert("Failed to transfer tokens.");
    }
  };

  return (
    <div>
      <h3>Transfer From Tokens</h3>
      <input
        type="text"
        placeholder="Sender Address"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
      />
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
      <button onClick={handleTransferFrom}>Transfer From</button>
    </div>
  );
};

export default TransferFromTokens;
