
import React, { useState } from "react";
import { ethers } from "ethers";

const BalanceOf = ({ contract }) => {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

  const handleCheckBalance = async () => {
    try {
      const balance = await contract.balanceOf(address);
      setBalance(ethers.utils.formatUnits(balance, 18)); // Assuming 18 decimals
    } catch (error) {
      console.error("Error fetching balance:", error);
      alert("Failed to fetch balance.");
    }
  };

  return (
    <div>
      <h3>Check Balance</h3>
      <input
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button onClick={handleCheckBalance}>Check Balance</button>
      {balance && (
        <div>
          <p>Balance: {balance} tokens</p>
        </div>
      )}
    </div>
  );
};

export default BalanceOf;