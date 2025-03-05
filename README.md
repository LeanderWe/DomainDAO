# DomainDAO

A decentralized autonomous organization (DAO) for collaborative domain name investment and management.

## Overview

DomainDAO enables groups to collectively invest in, manage, and profit from premium domain names through a transparent governance system powered by blockchain technology.

## Features

- **Proposal System**: Create and vote on domain acquisition, sales, and management proposals
- **Token-based Voting**: Democratic decision making weighted by token holdings
- **Portfolio Management**: Track and manage domain assets and revenue
- **Web3 Integration**: MetaMask wallet connection for seamless blockchain interaction

## Tech Stack

- **Frontend**: React + TypeScript
- **Blockchain**: Ethereum / Solidity
- **Web3**: Web3.js for smart contract interaction
- **Styling**: CSS3 with responsive design

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MetaMask browser extension
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/DomainDAO.git
cd DomainDAO
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open [http://localhost:3000](http://localhost:3000) to view in your browser.

## Smart Contract

The DomainDAO smart contract includes:

- Proposal creation and management
- Token-weighted voting system
- Automated proposal execution
- Member management

### Key Functions

- `createProposal()`: Submit new domain investment proposals
- `vote()`: Cast votes on active proposals
- `executeProposal()`: Execute passed proposals
- `getProposal()`: Retrieve proposal details

## Usage

### 1. Connect Wallet
Connect your MetaMask wallet to interact with the DAO.

### 2. View Proposals
Browse active domain investment proposals and their details.

### 3. Create Proposals
Submit new proposals for domain acquisitions, sales, or management decisions.

### 4. Vote
Participate in governance by voting on proposals that align with your investment strategy.

### 5. Portfolio Tracking
Monitor the DAO's domain portfolio and performance metrics.

## Proposal Types

- **Acquire**: Purchase premium domains
- **Sell**: Liquidate domain assets
- **Lease**: Generate recurring revenue through domain leasing
- **Develop**: Enhance domain value through development

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Deploy to testnet
- [ ] Implement domain valuation API
- [ ] Add automated domain monitoring
- [ ] Multi-chain support
- [ ] Mobile app development

## Contact

For questions or support, please open an issue on GitHub.