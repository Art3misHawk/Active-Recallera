import React, { useState, useEffect } from 'react';
import { noteService } from '../services/noteService';

const NoteModal = ({ note, onSave, onClose, modalStyle = 'glass' }) => {
  const [formData, setFormData] = useState({
    title: note?.title || '',
    description: note?.description || '',
    tags: note?.tags || []
  });
  const [tagInput, setTagInput] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [availableTags, setAvailableTags] = useState([]);
  const [showTagSuggestions, setShowTagSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);

  useEffect(() => {
    // Trigger animation on mount
    setIsVisible(true);
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Load available tags
    const tags = noteService.getAllAvailableTags();
    setAvailableTags(tags);
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // Update tag suggestions when tag input changes
  useEffect(() => {
    if (tagInput.trim()) {
      const filtered = availableTags.filter(tag => 
        tag.toLowerCase().includes(tagInput.toLowerCase()) &&
        !formData.tags.includes(tag)
      );
      setFilteredSuggestions(filtered);
      setShowTagSuggestions(filtered.length > 0);
    } else {
      // Show all available tags when input is empty (if there are any)
      const availableForSelection = availableTags.filter(tag => !formData.tags.includes(tag));
      setFilteredSuggestions(availableForSelection);
      setShowTagSuggestions(false); // Don't show when empty by default
    }
  }, [tagInput, availableTags, formData.tags]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 200); // Wait for animation
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;
    
    onSave(formData);
  };

  const handleAddTag = () => {
    const tag = tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
    if (e.key === 'Escape') {
      setShowTagSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion) => {
    setFormData(prev => ({
      ...prev,
      tags: [...prev.tags, suggestion]
    }));
    setTagInput('');
    setShowTagSuggestions(false);
  };

  const handleTagInputFocus = () => {
    // Show available tags when focusing on input (if there are any)
    const availableForSelection = availableTags.filter(tag => !formData.tags.includes(tag));
    if (availableForSelection.length > 0) {
      setFilteredSuggestions(availableForSelection);
      setShowTagSuggestions(true);
    }
  };

  const handleTagInputBlur = () => {
    // Hide suggestions after a short delay to allow clicking on suggestions
    setTimeout(() => {
      setShowTagSuggestions(false);
    }, 200);
  };

  const getModalClasses = () => {
    const baseClass = 'modern-modal-overlay';
    const styleClass = modalStyle === 'minimal' ? 'minimal-modal' : 
                      modalStyle === 'card' ? 'card-modal' :
                      modalStyle === 'floating' ? 'floating-modal' : 'glass-modal';
    const visibleClass = isVisible ? 'modal-visible' : '';
    return `${baseClass} ${styleClass} ${visibleClass}`;
  };

  return (
    <div className={getModalClasses()} onClick={handleClose}>
      <div className="modern-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header with enhanced styling */}
        <div className="modern-modal-header">
          <div className="modal-header-content">
            <div className="modal-icon">
              {note ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/>
                </svg>
              )}
            </div>
            <div className="modal-title-section">
              <h2 className="modern-modal-title">
                {note ? 'Edit Note' : 'New Note'}
              </h2>
            </div>
          </div>
          <button className="modern-close-button" onClick={handleClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
            </svg>
          </button>
        </div>

        {/* Enhanced form with better UX */}
        <form onSubmit={handleSubmit} className="modern-modal-form">
          <div className="form-section">
            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <span className="label-text">Question</span>
              </label>
              <div className="input-wrapper">
                <input
                  type="text"
                  className="enhanced-form-input"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="What do you want to remember?"
                  required
                  autoFocus
                />
              </div>
            </div>

            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <span className="label-text">Answer</span>
              </label>
              <div className="textarea-wrapper">
                <textarea
                  className="enhanced-form-textarea"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Write your answer here..."
                  required
                  rows={4}
                />
              </div>
            </div>

            <div className="enhanced-form-group">
              <label className="enhanced-form-label">
                <span className="label-text">Tags (optional)</span>
              </label>
              <div className="tag-input-section">
                <div className="tag-input-wrapper">
                  <input
                    type="text"
                    className="enhanced-form-input tag-input"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={handleTagInputKeyPress}
                    onFocus={handleTagInputFocus}
                    onBlur={handleTagInputBlur}
                    placeholder="Add tags..."
                  />
                  <button
                    type="button"
                    className="add-tag-button"
                    onClick={handleAddTag}
                    disabled={!tagInput.trim()}
                  >
                    +
                  </button>
                </div>
                
                {/* Tag Suggestions Dropdown */}
                {showTagSuggestions && filteredSuggestions.length > 0 && (
                  <div className="tag-suggestions-dropdown">
                    {filteredSuggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        className="tag-suggestion-item"
                        onClick={() => selectSuggestion(suggestion)}
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
                
                {formData.tags.length > 0 && (
                  <div className="tags-display-modern">
                    {formData.tags.map((tag) => (
                      <span key={tag} className="modern-tag">
                        {tag}
                        <button
                          type="button"
                          className="tag-remove-modern"
                          onClick={() => handleRemoveTag(tag)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced action buttons */}
          <div className="modern-modal-footer">
            <button type="button" className="btn btn-ghost modern-cancel-btn" onClick={handleClose}>
              <span>Cancel</span>
            </button>
            <button 
              type="submit" 
              className="btn btn-primary modern-submit-btn"
              disabled={!formData.title.trim() || !formData.description.trim()}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9,20.42L2.79,14.21L5.62,11.38L9,14.77L18.88,4.88L21.71,7.71L9,20.42Z"/>
              </svg>
              <span>{note ? 'Update Note' : 'Create Note'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
