import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const WalletConnect: React.FC = () => {
  const { account, isConnected, connectWallet, disconnectWallet } = useWeb3();

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="wallet-connect">
      {!isConnected ? (
        <button onClick={connectWallet} className="connect-btn">
          Connect Wallet
        </button>
      ) : (
        <div className="wallet-info">
          <span className="address">{truncateAddress(account)}</span>
          <button onClick={disconnectWallet} className="disconnect-btn">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};

export default WalletConnect;