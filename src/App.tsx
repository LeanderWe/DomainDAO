import React, { useState } from 'react';
import './App.css';
import WalletConnect from './components/WalletConnect';
import ProposalList from './components/ProposalList';
import DomainPortfolio from './components/DomainPortfolio';
import Navigation from './components/Navigation';

function App() {
  const [activeTab, setActiveTab] = useState('proposals');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'proposals':
        return <ProposalList />;
      case 'portfolio':
        return <DomainPortfolio />;
      case 'create':
        return <div>Create Proposal (Coming Soon)</div>;
      default:
        return <ProposalList />;
    }
  };

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

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="main-content">
        {renderActiveComponent()}
      </main>
    </div>
  );
}

export default App;