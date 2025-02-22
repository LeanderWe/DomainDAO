import React from 'react';
import './App.css';
import WalletConnect from './components/WalletConnect';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="title-section">
            <h1>DomainDAO</h1>
            <p>Decentralized Domain Name Governance</p>
          </div>
          <WalletConnect />
        </div>
      </header>
    </div>
  );
}

export default App;