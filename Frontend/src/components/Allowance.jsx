import React, { useState } from "react";
import { ethers } from "ethers";

const Allowance = ({ contract }) => {
  const [owner, setOwner] = useState("");
  const [spender, setSpender] = useState("");
  const [allowanceAmount, setAllowanceAmount] = useState("");

  const handleCheckAllowance = async () => {
    try {
      const allowance = await contract.allowance(owner, spender);
      setAllowanceAmount(ethers.utils.formatUnits(allowance, 18)); // Assuming 18 decimals
    } catch (error) {
      console.error("Error fetching allowance:", error);
      alert("Failed to fetch allowance.");
    }
  };

  return (
    <div>
      <h3>Check Allowance</h3>
      <input
        type="text"
        placeholder="Owner Address"
        value={owner}
        onChange={(e) => setOwner(e.target.value)}
      />
      <input
        type="text"
        placeholder="Spender Address"
        value={spender}
        onChange={(e) => setSpender(e.target.value)}
      />
      <button onClick={handleCheckAllowance}>Check Allowance</button>
      {allowanceAmount && (
        <div>
          <p>Allowance: {allowanceAmount} tokens</p>
        </div>
      )}
    </div>
  );
};

export default Allowance;
