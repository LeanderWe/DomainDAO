import React from 'react';

interface Proposal {
  id: number;
  title: string;
  description: string;
  domain: string;
  status: 'active' | 'passed' | 'rejected';
  votesFor: number;
  votesAgainst: number;
  endTime: Date;
}

const mockProposals: Proposal[] = [
  {
    id: 1,
    title: "Acquire premium-domains.com",
    description: "Strategic acquisition of premium-domains.com for portfolio expansion",
    domain: "premium-domains.com",
    status: "active",
    votesFor: 47,
    votesAgainst: 12,
    endTime: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  },
  {
    id: 2,
    title: "Lease web3tools.io to startup",
    description: "Proposal to lease web3tools.io domain to emerging startup for 2 years",
    domain: "web3tools.io",
    status: "active",
    votesFor: 23,
    votesAgainst: 8,
    endTime: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  }
];

const ProposalList: React.FC = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return '#61dafb';
      case 'passed': return '#4caf50';
      case 'rejected': return '#f44336';
      default: return '#999';
    }
  };

  const formatTimeRemaining = (endTime: Date) => {
    const now = new Date();
    const diff = endTime.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h remaining`;
    return `${hours}h remaining`;
  };

  return (
    <div className="proposal-list">
      <h2>Active Proposals</h2>
      {mockProposals.map(proposal => (
        <div key={proposal.id} className="proposal-card">
          <div className="proposal-header">
            <h3>{proposal.title}</h3>
            <span
              className="status-badge"
              style={{ backgroundColor: getStatusColor(proposal.status) }}
            >
              {proposal.status.toUpperCase()}
            </span>
          </div>

          <p className="proposal-description">{proposal.description}</p>
          <p className="domain-name">Domain: <strong>{proposal.domain}</strong></p>

          <div className="voting-info">
            <div className="votes">
              <span className="votes-for">👍 {proposal.votesFor}</span>
              <span className="votes-against">👎 {proposal.votesAgainst}</span>
            </div>
            <div className="time-remaining">
              {formatTimeRemaining(proposal.endTime)}
            </div>
          </div>

          <div className="proposal-actions">
            <button className="vote-btn vote-for">Vote For</button>
            <button className="vote-btn vote-against">Vote Against</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProposalList;