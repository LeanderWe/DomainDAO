import React from 'react';

interface Domain {
  id: number;
  name: string;
  category: string;
  acquisitionDate: string;
  estimatedValue: number;
  status: 'owned' | 'leased' | 'for-sale';
  monthlyRevenue?: number;
}

const mockDomains: Domain[] = [
  {
    id: 1,
    name: "cryptotools.io",
    category: "Technology",
    acquisitionDate: "2024-12-15",
    estimatedValue: 25000,
    status: "owned"
  },
  {
    id: 2,
    name: "defianalytics.com",
    category: "Finance",
    acquisitionDate: "2024-11-08",
    estimatedValue: 18000,
    status: "leased",
    monthlyRevenue: 500
  },
  {
    id: 3,
    name: "nftmarketplace.xyz",
    category: "NFT",
    acquisitionDate: "2024-10-22",
    estimatedValue: 32000,
    status: "for-sale"
  },
  {
    id: 4,
    name: "web3startup.dev",
    category: "Development",
    acquisitionDate: "2024-09-30",
    estimatedValue: 15000,
    status: "owned"
  }
];

const DomainPortfolio: React.FC = () => {
  const totalValue = mockDomains.reduce((sum, domain) => sum + domain.estimatedValue, 0);
  const totalRevenue = mockDomains
    .filter(d => d.monthlyRevenue)
    .reduce((sum, domain) => sum + (domain.monthlyRevenue || 0), 0);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'owned': return '#4caf50';
      case 'leased': return '#ff9800';
      case 'for-sale': return '#2196f3';
      default: return '#999';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'owned': return 'Owned';
      case 'leased': return 'Leased';
      case 'for-sale': return 'For Sale';
      default: return status;
    }
  };

  return (
    <div className="domain-portfolio">
      <div className="portfolio-header">
        <h2>Domain Portfolio</h2>
        <div className="portfolio-stats">
          <div className="stat-card">
            <h3>Total Value</h3>
            <p className="stat-value">${totalValue.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Monthly Revenue</h3>
            <p className="stat-value">${totalRevenue.toLocaleString()}</p>
          </div>
          <div className="stat-card">
            <h3>Total Domains</h3>
            <p className="stat-value">{mockDomains.length}</p>
          </div>
        </div>
      </div>

      <div className="domain-grid">
        {mockDomains.map(domain => (
          <div key={domain.id} className="domain-card">
            <div className="domain-header">
              <h3 className="domain-name">{domain.name}</h3>
              <span
                className="status-tag"
                style={{ backgroundColor: getStatusColor(domain.status) }}
              >
                {getStatusText(domain.status)}
              </span>
            </div>

            <div className="domain-details">
              <p><strong>Category:</strong> {domain.category}</p>
              <p><strong>Acquired:</strong> {domain.acquisitionDate}</p>
              <p><strong>Estimated Value:</strong> ${domain.estimatedValue.toLocaleString()}</p>
              {domain.monthlyRevenue && (
                <p><strong>Monthly Revenue:</strong> ${domain.monthlyRevenue.toLocaleString()}</p>
              )}
            </div>

            <div className="domain-actions">
              <button className="action-btn primary">Manage</button>
              <button className="action-btn secondary">Details</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DomainPortfolio;