import React, { useState } from 'react';
import NoteModal from './NoteModal';

const ModalStyleDemo = ({ onAddNote }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalStyle, setModalStyle] = useState('glass');
  const [selectedOption, setSelectedOption] = useState(null);

  const styleOptions = [
    {
      id: 'glass',
      name: 'Glass Morphism',
      description: 'Modern frosted glass effect with blur',
      features: ['Backdrop blur', 'Semi-transparent', 'Premium feel', 'Smooth animations'],
      preview: '🪟'
    },
    {
      id: 'minimal',
      name: 'Clean Minimal',
      description: 'Simple, clean design with subtle shadows',
      features: ['Pure white background', 'Crisp borders', 'Focused content', 'Fast performance'],
      preview: '⚪'
    },
    {
      id: 'card',
      name: 'Gradient Card',
      description: 'Card-style with gradient accents',
      features: ['Gradient backgrounds', 'Colored borders', 'Dynamic shadows', 'Brand colors'],
      preview: '🎨'
    },
    {
      id: 'floating',
      name: 'Floating Panel',
      description: 'Elevated floating design with deep blur',
      features: ['Heavy blur effect', 'Floating appearance', 'No borders', 'Layered shadows'],
      preview: '☁️'
    }
  ];

  const handleStyleSelect = (style) => {
    setModalStyle(style.id);
    setSelectedOption(style);
    setShowModal(true);
  };

  const handleSave = (noteData) => {
    onAddNote(noteData);
    setShowModal(false);
    setSelectedOption(null);
  };

  return (
    <div className="modal-style-demo">
      <div className="demo-header">
        <h2>Choose Your Modal Style</h2>
        <p>Select the design that best fits your preference</p>
      </div>

      <div className="style-options-grid">
        {styleOptions.map(option => (
          <div 
            key={option.id} 
            className={`style-option-card ${selectedOption?.id === option.id ? 'selected' : ''}`}
            onClick={() => handleStyleSelect(option)}
          >
            <div className="option-preview">
              <span className="preview-icon">{option.preview}</span>
            </div>
            <div className="option-content">
              <h3 className="option-name">{option.name}</h3>
              <p className="option-description">{option.description}</p>
              <ul className="option-features">
                {option.features.map(feature => (
                  <li key={feature}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            <div className="option-action">
              <button className="btn btn-primary btn-sm">
                Try This Style
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="demo-info">
        <div className="info-card">
          <h4>🎯 What's New in This Modal?</h4>
          <ul>
            <li><strong>Enhanced UX:</strong> Better form layouts with helpful hints</li>
            <li><strong>Visual Feedback:</strong> Character counts, input icons, and progress indicators</li>
            <li><strong>Smooth Animations:</strong> Scale and fade transitions for a premium feel</li>
            <li><strong>Accessibility:</strong> Keyboard navigation and focus management</li>
            <li><strong>Mobile Optimized:</strong> Responsive design that works on all devices</li>
          </ul>
        </div>
      </div>

      {showModal && (
        <NoteModal
          modalStyle={modalStyle}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setSelectedOption(null);
          }}
        />
      )}
    </div>
  );
};

export default ModalStyleDemo;
