import React from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './config/TokenLockingABI';
import LockTokens from "./components/LockTokens";
import UnlockTokens from "./components/UnlockTokens";
import AddLockOption from "./components/AddLockOption";
import WithdrawEther from "./components/WithdrawEther";
import EarlyUnlockTokens from "./components/EarlyUnlockTokens"; 
import UpdatePenaltyRate from "./components/UpdatePenaltyRate"; 
import TransferTokens from "./components/TransferTokens"; 
import ApproveTokens from "./components/ApproveTokens"; 
import TransferFromTokens from "./components/TransferFromTokens"; 
import Allowance from "./components/Allowance"; 
import BalanceOf from "./components/BalanceOf"; 
import TokenInfo from "./components/TokenInfo"; 
import TokenLocking from "./components/TokenLocking"; 
import './App.css';

//import CalculateReward from "./components/CalculateReward"; 

const App = () => {
  const [account, setAccount] = React.useState(null);
  const [provider, setProvider] = React.useState(null);
  const [contract, setContract] = React.useState(null);

  React.useEffect(() => {
    const init = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contractAddress = CONTRACT_ADDRESS;
      const contract = new ethers.Contract(contractAddress, CONTRACT_ABI, provider.getSigner());

      setProvider(provider);
      setContract(contract);
    };

    init();
  }, []);

  const connectWallet = async () => {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    setAccount(accounts[0]);
  };

  return (
    <div className="container">
      <h1>Token Locking Dapp</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
      {account && <p>Connected account: {account}</p>}
      <LockTokens contract={contract} />
      <UnlockTokens contract={contract} />
      <AddLockOption contract={contract} />
      <WithdrawEther contract={contract} />
      <EarlyUnlockTokens contract={contract} /> 
      <UpdatePenaltyRate contract={contract} />
      <TransferTokens contract={contract} /> 
      <ApproveTokens contract={contract} /> 
      <TransferFromTokens contract={contract} />
      <Allowance contract={contract} />
      <BalanceOf contract={contract} /> 
      <TokenInfo contract={contract} /> 
      <TokenLocking contract={contract} /> 
      
    </div>
  );
};

export default App;