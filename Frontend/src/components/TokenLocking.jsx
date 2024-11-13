import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

const TokenLocking = ({ contract }) => {
  const [address, setAddress] = useState("");
  const [compartment, setCompartment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompartment = async (userAddress) => {
    setLoading(true);
    setError(null);
    try {
      // Fetch the user's compartment
      const userCompartment = await contract.compartments(userAddress);
      setCompartment(userCompartment);
    } catch (err) {
      console.error("Error fetching compartment:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleFetchCompartment = (e) => {
    e.preventDefault();
    if (ethers.utils.isAddress(address)) {
      fetchCompartment(address);
    } else {
      setError("Invalid address");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!compartment || !compartment.isLocked) {
    return (
      <div>
        <form onSubmit={handleFetchCompartment}>
          <input
            type="text"
            value={address}
            onChange={handleAddressChange}
            placeholder="Enter address"
            required
          />
          <button type="submit">Fetch Compartment</button>
        </form>
        <div>No tokens are currently locked for this address.</div>
      </div>
    );
  }
  return (
    <div>
      <h3>Your Locked Tokens</h3>
      <p>Locked Amount: {ethers.utils.formatUnits(compartment.lockedAmount, 18)} TLK</p>
      <p>Lock Start Time: {new Date(compartment.lockStartTime * 1000).toLocaleString()}</p>
      <p>Lock End Time: {new Date(compartment.lockEndTime * 1000).toLocaleString()}</p>
      <p>Is Locked: {compartment.isLocked ? 'Yes' : 'No'}</p>
    </div>
  );
};

export default TokenLocking;