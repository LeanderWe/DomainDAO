// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DomainDAO {
    struct Proposal {
        uint256 id;
        address proposer;
        string title;
        string description;
        string domain;
        uint256 targetPrice;
        uint256 endTime;
        uint256 votesFor;
        uint256 votesAgainst;
        bool executed;
        ProposalType proposalType;
    }

    enum ProposalType {
        ACQUIRE,
        SELL,
        LEASE,
        DEVELOP
    }

    enum ProposalStatus {
        ACTIVE,
        PASSED,
        REJECTED,
        EXECUTED
    }

    mapping(uint256 => Proposal) public proposals;
    mapping(uint256 => mapping(address => bool)) public hasVoted;
    mapping(address => uint256) public memberTokens;

    uint256 public proposalCount;
    uint256 public totalSupply;
    uint256 public constant VOTING_PERIOD = 7 days;
    uint256 public constant MIN_PROPOSAL_THRESHOLD = 100;

    address public owner;

    event ProposalCreated(uint256 indexed proposalId, address indexed proposer, string title);
    event VoteCasted(uint256 indexed proposalId, address indexed voter, bool support, uint256 weight);
    event ProposalExecuted(uint256 indexed proposalId, bool passed);

    modifier onlyMember() {
        require(memberTokens[msg.sender] > 0, "Not a DAO member");
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }

    constructor() {
        owner = msg.sender;
        totalSupply = 1000000;
        memberTokens[msg.sender] = totalSupply;
    }

    function createProposal(
        string memory _title,
        string memory _description,
        string memory _domain,
        uint256 _targetPrice,
        ProposalType _proposalType
    ) external onlyMember {
        require(memberTokens[msg.sender] >= MIN_PROPOSAL_THRESHOLD, "Insufficient tokens to create proposal");

        proposalCount++;

        proposals[proposalCount] = Proposal({
            id: proposalCount,
            proposer: msg.sender,
            title: _title,
            description: _description,
            domain: _domain,
            targetPrice: _targetPrice,
            endTime: block.timestamp + VOTING_PERIOD,
            votesFor: 0,
            votesAgainst: 0,
            executed: false,
            proposalType: _proposalType
        });

        emit ProposalCreated(proposalCount, msg.sender, _title);
    }

    function vote(uint256 _proposalId, bool _support) external onlyMember {
        require(_proposalId <= proposalCount, "Invalid proposal");
        require(!hasVoted[_proposalId][msg.sender], "Already voted");
        require(block.timestamp < proposals[_proposalId].endTime, "Voting period ended");

        uint256 weight = memberTokens[msg.sender];
        hasVoted[_proposalId][msg.sender] = true;

        if (_support) {
            proposals[_proposalId].votesFor += weight;
        } else {
            proposals[_proposalId].votesAgainst += weight;
        }

        emit VoteCasted(_proposalId, msg.sender, _support, weight);
    }

    function executeProposal(uint256 _proposalId) external {
        require(_proposalId <= proposalCount, "Invalid proposal");
        require(block.timestamp >= proposals[_proposalId].endTime, "Voting period not ended");
        require(!proposals[_proposalId].executed, "Already executed");

        Proposal storage proposal = proposals[_proposalId];
        bool passed = proposal.votesFor > proposal.votesAgainst;

        proposal.executed = true;

        emit ProposalExecuted(_proposalId, passed);
    }

    function getProposal(uint256 _proposalId) external view returns (
        uint256 id,
        address proposer,
        string memory title,
        string memory description,
        string memory domain,
        uint256 targetPrice,
        uint256 endTime,
        uint256 votesFor,
        uint256 votesAgainst,
        bool executed,
        ProposalType proposalType
    ) {
        require(_proposalId <= proposalCount, "Invalid proposal");
        Proposal memory proposal = proposals[_proposalId];

        return (
            proposal.id,
            proposal.proposer,
            proposal.title,
            proposal.description,
            proposal.domain,
            proposal.targetPrice,
            proposal.endTime,
            proposal.votesFor,
            proposal.votesAgainst,
            proposal.executed,
            proposal.proposalType
        );
    }

    function getProposalStatus(uint256 _proposalId) external view returns (ProposalStatus) {
        require(_proposalId <= proposalCount, "Invalid proposal");
        Proposal memory proposal = proposals[_proposalId];

        if (proposal.executed) {
            return proposal.votesFor > proposal.votesAgainst ? ProposalStatus.EXECUTED : ProposalStatus.REJECTED;
        }

        if (block.timestamp < proposal.endTime) {
            return ProposalStatus.ACTIVE;
        }

        return proposal.votesFor > proposal.votesAgainst ? ProposalStatus.PASSED : ProposalStatus.REJECTED;
    }

    function addMember(address _member, uint256 _tokens) external onlyOwner {
        memberTokens[_member] = _tokens;
    }

    function getTokenBalance(address _member) external view returns (uint256) {
        return memberTokens[_member];
    }
}