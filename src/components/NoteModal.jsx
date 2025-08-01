import React, { useState } from 'react';

const NoteModal = ({ note, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    title: note?.title || '',
    description: note?.description || '',
    tags: note?.tags || []
  });
  const [tagInput, setTagInput] = useState('');

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
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">
            {note ? 'Edit Note' : 'Add New Note'}
          </h2>
          <button className="close-button" onClick={onClose}>
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title (Question/Concept)</label>
            <input
              type="text"
              className="form-input"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="What do you want to remember?"
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description (Answer/Details)</label>
            <textarea
              className="form-textarea"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Provide the detailed answer or explanation..."
              required
              rows={6}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Tags</label>
            <div className="tag-input-container">
              <input
                type="text"
                className="form-input"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleTagInputKeyPress}
                placeholder="Add a tag and press Enter"
              />
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleAddTag}
                disabled={!tagInput.trim()}
              >
                Add Tag
              </button>
            </div>
            
            {formData.tags.length > 0 && (
              <div className="tags-display">
                {formData.tags.map(tag => (
                  <span key={tag} className="tag editable-tag">
                    {tag}
                    <button
                      type="button"
                      className="tag-remove"
                      onClick={() => handleRemoveTag(tag)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="modal-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!formData.title.trim() || !formData.description.trim()}
            >
              {note ? 'Update Note' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteModal;
