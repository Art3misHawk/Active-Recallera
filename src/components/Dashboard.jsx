import React from 'react';
import { noteService } from '../services/noteService';

const Dashboard = ({ notes, onStartStudy, onAddNote }) => {
  const stats = noteService.getStats();
  const dueNotes = noteService.getDueNotes();
  
  const recentNotes = notes
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  // Temporary function to add test tags
  const addTestTags = () => {
    noteService.addTestTags();
    alert('Test tags added! Now try creating a new note and click on the tag input field.');
  };

  return (
    <div className="dashboard animate-fade-in">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Welcome back!</h1>
        <p className="dashboard-subtitle">
          Ready to strengthen your knowledge with spaced repetition?
        </p>
      </div>

      <div className="dashboard-stats">
        <div className="card stat-card">
          <div className="stat-number due">{stats.due}</div>
          <div className="stat-label">Due Today</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-number overdue">{stats.overdue}</div>
          <div className="stat-label">Overdue</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-number total">{stats.total}</div>
          <div className="stat-label">Total Notes</div>
        </div>
        
        <div className="card stat-card">
          <div className="stat-number">{stats.averageSuccessRate}%</div>
          <div className="stat-label">Success Rate</div>
        </div>
      </div>

      <div className="dashboard-actions">
        {dueNotes.length > 0 ? (
          <button 
            className="btn btn-primary btn-lg"
            onClick={onStartStudy}
          >
            📚 Study Now ({dueNotes.length} notes)
          </button>
        ) : (
          <div className="text-center">
            <p className="text-muted mb-lg">No notes due for review right now!</p>
            <button 
              className="btn btn-secondary btn-lg"
              onClick={onAddNote}
            >
              ➕ Add Your First Note
            </button>
          </div>
        )}
        
        {/* Temporary test button */}
        <button 
          className="btn btn-outline btn-sm"
          onClick={addTestTags}
          style={{ marginTop: '1rem', fontSize: '12px' }}
        >
          🏷️ Add Test Tags (for testing)
        </button>
      </div>

      {recentNotes.length > 0 && (
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Recent Notes</h3>
          </div>
          
          <div className="grid">
            {recentNotes.map(note => (
              <div key={note.id} className="recent-note">
                <h4 className="note-title">{note.title}</h4>
                <p className="note-description">
                  {note.description.length > 100 
                    ? `${note.description.substring(0, 100)}...` 
                    : note.description}
                </p>
                <div className="note-meta">
                  <span className="due-date">
                    {noteService.formatRelativeTime(note.nextReview)}
                  </span>
                  {note.tags.length > 0 && (
                    <div className="card-tags">
                      {note.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
