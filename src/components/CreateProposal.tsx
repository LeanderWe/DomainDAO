import React, { useState } from 'react';

interface CreateProposalProps {
  onProposalCreated?: () => void;
}

const CreateProposal: React.FC<CreateProposalProps> = ({ onProposalCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    domain: '',
    proposalType: 'acquire',
    targetPrice: '',
    duration: '7'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const proposalTypes = [
    { value: 'acquire', label: 'Acquire Domain' },
    { value: 'sell', label: 'Sell Domain' },
    { value: 'lease', label: 'Lease Domain' },
    { value: 'develop', label: 'Develop Domain' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      console.log('Creating proposal:', formData);

      setTimeout(() => {
        setIsSubmitting(false);
        alert('Proposal created successfully!');
        setFormData({
          title: '',
          description: '',
          domain: '',
          proposalType: 'acquire',
          targetPrice: '',
          duration: '7'
        });
        if (onProposalCreated) {
          onProposalCreated();
        }
      }, 2000);

    } catch (error) {
      setIsSubmitting(false);
      alert('Failed to create proposal. Please try again.');
    }
  };

  const isFormValid = formData.title && formData.description && formData.domain;

  return (
    <div className="create-proposal">
      <h2>Create New Proposal</h2>

      <form onSubmit={handleSubmit} className="proposal-form">
        <div className="form-group">
          <label htmlFor="title">Proposal Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="e.g., Acquire premium-domains.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="proposalType">Proposal Type</label>
          <select
            id="proposalType"
            name="proposalType"
            value={formData.proposalType}
            onChange={handleInputChange}
            required
          >
            {proposalTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="domain">Domain Name</label>
          <input
            type="text"
            id="domain"
            name="domain"
            value={formData.domain}
            onChange={handleInputChange}
            placeholder="example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="targetPrice">Target Price (USD)</label>
          <input
            type="number"
            id="targetPrice"
            name="targetPrice"
            value={formData.targetPrice}
            onChange={handleInputChange}
            placeholder="25000"
            min="0"
          />
        </div>

        <div className="form-group">
          <label htmlFor="duration">Voting Duration (days)</label>
          <select
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            required
          >
            <option value="3">3 days</option>
            <option value="7">7 days</option>
            <option value="14">14 days</option>
            <option value="30">30 days</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Detailed description of the proposal..."
            rows={4}
            required
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="submit-btn"
            disabled={!isFormValid || isSubmitting}
          >
            {isSubmitting ? 'Creating Proposal...' : 'Create Proposal'}
          </button>
        </div>
      </form>

      <div className="proposal-info">
        <h3>Proposal Guidelines</h3>
        <ul>
          <li>Provide a clear and descriptive title</li>
          <li>Include detailed rationale in the description</li>
          <li>Research domain value and market conditions</li>
          <li>Consider the DAO's treasury and investment strategy</li>
          <li>Proposals require 50%+ approval to pass</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateProposal;