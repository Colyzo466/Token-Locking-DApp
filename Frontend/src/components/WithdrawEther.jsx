import React from "react";
import { ethers } from "ethers";

const WithDrawEther = ({ contract }) => {
  const handleWithDrawEther = async () => {
    try {
      const tx = await contract.withdrawEther();
      await tx.wait();
      alert("Ether withdrawn successfully!");
    } catch (error) {
      console.error("Error withdrawing Ether:", error);
      alert("An error occurred while withdrawing Ether. Please try again.");
    }
  };

  return (
    <div>
      <h3>Withdraw Ether</h3>
      <button onClick={handleWithDrawEther}>Withdraw Ether</button>
    </div>
  );
};

export default WithDrawEther;
