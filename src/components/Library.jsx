import React, { useState, useMemo } from 'react';
import { noteService } from '../services/noteService';

const Library = ({ notes, onEditNote, onDeleteNote }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [sortBy, setSortBy] = useState('created');
  const [viewMode, setViewMode] = useState('cards'); // 'cards' or 'table'

  const allTags = noteService.getAllTags();

  const filteredNotes = useMemo(() => {
    let filtered = notes;

    // Search filter
    if (searchQuery.trim()) {
      filtered = noteService.searchNotes(searchQuery);
    }

    // Tag filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(note =>
        selectedTags.every(tag => note.tags.includes(tag))
      );
    }

    // Sort
    switch (sortBy) {
      case 'created':
        filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'title':
        filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'due':
        filtered = filtered.sort((a, b) => new Date(a.nextReview) - new Date(b.nextReview));
        break;
      case 'reviews':
        filtered = filtered.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }

    return filtered;
  }, [notes, searchQuery, selectedTags, sortBy]);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleDeleteNote = (noteId) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      onDeleteNote(noteId);
    }
  };

  const getNoteStatus = (note) => {
    const now = new Date();
    const nextReview = new Date(note.nextReview);
    const diffDays = Math.floor((now - nextReview) / (1000 * 60 * 60 * 24));

    if (diffDays > 0) return 'overdue';
    if (diffDays === 0) return 'due';
    return 'upcoming';
  };

  return (
    <div className="library animate-fade-in">
      <div className="library-header">
        <h2>Note Library</h2>
        
        <div className="search-filters">
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          
          <select
            className="form-input"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="created">Sort by Created</option>
            <option value="title">Sort by Title</option>
            <option value="due">Sort by Due Date</option>
            <option value="reviews">Sort by Reviews</option>
          </select>

          <div className="view-selector">
            <button
              className={`btn ${viewMode === 'cards' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setViewMode('cards')}
              title="Card view"
            >
              📋 Cards
            </button>
            <button
              className={`btn ${viewMode === 'table' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
              onClick={() => setViewMode('table')}
              title="Table view"
            >
              📊 Table
            </button>
          </div>
        </div>
      </div>

      {allTags.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Filter by Tags</h3>
          </div>
          <div className="tags-filter">
            {allTags.map(tag => (
              <button
                key={tag}
                className={`tag ${selectedTags.includes(tag) ? 'tag-selected' : ''}`}
                onClick={() => handleTagToggle(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="library-stats">
        <p className="text-muted">
          Showing {filteredNotes.length} of {notes.length} notes
        </p>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="card text-center">
          <h3>No notes found</h3>
          <p className="text-muted">
            {searchQuery || selectedTags.length > 0
              ? 'Try adjusting your search or filters'
              : 'Start by creating your first note!'}
          </p>
        </div>
      ) : viewMode === 'cards' ? (
        <div className="notes-grid">
          {filteredNotes.map(note => {
            const status = getNoteStatus(note);
            return (
              <div key={note.id} className={`note-card ${status}`}>
                <div className="note-header">
                  <h3 className="note-title">{note.title}</h3>
                  <div className="note-actions">
                    <button
                      className="icon-button"
                      onClick={() => onEditNote(note)}
                      title="Edit note"
                    >
                      ✏️
                    </button>
                    <button
                      className="icon-button"
                      onClick={() => handleDeleteNote(note.id)}
                      title="Delete note"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                <div className="note-description">
                  {note.description}
                </div>

                {note.tags.length > 0 && (
                  <div className="card-tags">
                    {note.tags.map(tag => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                )}

                <div className="note-meta">
                  <span className={`due-date ${status === 'overdue' ? 'overdue' : status === 'due' ? 'due-soon' : ''}`}>
                    {noteService.formatRelativeTime(note.nextReview)}
                  </span>
                  <span className="review-count">
                    {note.reviewCount} review{note.reviewCount !== 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="notes-table-container">
          <table className="notes-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Title</th>
                <th>Description</th>
                <th>Tags</th>
                <th>Due Date</th>
                <th>Reviews</th>
                <th>Success Rate</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredNotes.map(note => {
                const status = getNoteStatus(note);
                const successRate = note.reviewCount > 0 
                  ? Math.round((note.successCount / note.reviewCount) * 100) 
                  : 0;
                
                return (
                  <tr key={note.id} className={`table-row ${status}`}>
                    <td>
                      <span className={`status-indicator ${status}`}>
                        {status === 'overdue' ? '🔴' : status === 'due' ? '🟡' : '🟢'}
                      </span>
                    </td>
                    <td className="title-cell">
                      <span className="table-title">{note.title}</span>
                    </td>
                    <td className="description-cell">
                      <span className="table-description">
                        {note.description.length > 100 
                          ? `${note.description.substring(0, 100)}...` 
                          : note.description}
                      </span>
                    </td>
                    <td className="tags-cell">
                      {note.tags.length > 0 ? (
                        <div className="table-tags">
                          {note.tags.slice(0, 3).map(tag => (
                            <span key={tag} className="tag tag-sm">{tag}</span>
                          ))}
                          {note.tags.length > 3 && (
                            <span className="tag tag-sm">+{note.tags.length - 3}</span>
                          )}
                        </div>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="due-cell">
                      <span className={`due-date ${status === 'overdue' ? 'overdue' : status === 'due' ? 'due-soon' : ''}`}>
                        {noteService.formatRelativeTime(note.nextReview)}
                      </span>
                    </td>
                    <td className="reviews-cell">
                      {note.reviewCount}
                    </td>
                    <td className="success-cell">
                      {note.reviewCount > 0 ? (
                        <span className={`success-rate ${successRate >= 70 ? 'good' : successRate >= 50 ? 'fair' : 'poor'}`}>
                          {successRate}%
                        </span>
                      ) : (
                        <span className="text-muted">—</span>
                      )}
                    </td>
                    <td className="actions-cell">
                      <div className="table-actions">
                        <button
                          className="icon-button"
                          onClick={() => onEditNote(note)}
                          title="Edit note"
                        >
                          ✏️
                        </button>
                        <button
                          className="icon-button"
                          onClick={() => handleDeleteNote(note.id)}
                          title="Delete note"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Library;
