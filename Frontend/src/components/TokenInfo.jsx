import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const TokenInfo = ({ contract }) => {
  const [tokenName, setTokenName] = useState("");
  const [tokenSymbol, setTokenSymbol] = useState("");

  useEffect(() => {
    const fetchTokenInfo = async () => {
      try {
        const name = await contract.name();
        const symbol = await contract.symbol();
        setTokenName(name);
        setTokenSymbol(symbol);
      } catch (error) {
        console.error("Error fetching token info:", error);
      }
    };

    if (contract) {
      fetchTokenInfo();
    }
  }, [contract]);

  return (
    <div>
      <h3>Token Information</h3>
      <p>Name: {tokenName}</p>
      <p>Symbol: {tokenSymbol}</p>
    </div>
  );
};

export default TokenInfo;
