import React from 'react';
import { noteService } from '../services/noteService';

const Stats = ({ notes }) => {
  const stats = noteService.getStats();
  
  const getIntervalDistribution = () => {
    const distribution = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };
    notes.forEach(note => {
      if (note.intervalIndex !== undefined) {
        distribution[note.intervalIndex]++;
      }
    });
    return distribution;
  };

  const getTagStats = () => {
    const tagCounts = {};
    notes.forEach(note => {
      note.tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });
    
    return Object.entries(tagCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  };

  const getRecentActivity = () => {
    const reviewed = notes
      .filter(note => note.lastReviewed)
      .sort((a, b) => new Date(b.lastReviewed) - new Date(a.lastReviewed))
      .slice(0, 10);
    
    return reviewed;
  };

  const intervalLabels = ['1 day', '3 days', '1 week', '2 weeks', '1 month'];
  const intervalDistribution = getIntervalDistribution();
  const topTags = getTagStats();
  const recentActivity = getRecentActivity();

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="stats animate-fade-in">
      <div className="stats-header">
        <h2>Study Statistics</h2>
        <p className="text-muted">Track your learning progress and patterns</p>
      </div>

      <div className="stats-grid">
        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Overview</h3>
          </div>
          <div className="overview-stats">
            <div className="stat-item">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Notes</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.reviewed}</div>
              <div className="stat-label">Notes Reviewed</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.due + stats.overdue}</div>
              <div className="stat-label">Due for Review</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{stats.averageSuccessRate}%</div>
              <div className="stat-label">Success Rate</div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">Spaced Repetition Progress</h3>
          </div>
          <div className="interval-distribution">
            {intervalLabels.map((label, index) => {
              const count = intervalDistribution[index];
              const percentage = stats.total > 0 ? (count / stats.total * 100).toFixed(1) : 0;
              
              return (
                <div key={index} className="interval-bar">
                  <div className="interval-label">
                    <span>{label}</span>
                    <span>{count} notes</span>
                  </div>
                  <div className="progress-bar-container">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <div className="interval-percentage">{percentage}%</div>
                </div>
              );
            })}
          </div>
        </div>

        {topTags.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Top Tags</h3>
            </div>
            <div className="tag-stats">
              {topTags.map(([tag, count]) => (
                <div key={tag} className="tag-stat">
                  <span className="tag">{tag}</span>
                  <span className="tag-count">{count} note{count !== 1 ? 's' : ''}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {recentActivity.length > 0 && (
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Recent Activity</h3>
            </div>
            <div className="recent-activity">
              {recentActivity.map(note => (
                <div key={note.id} className="activity-item">
                  <div className="activity-content">
                    <div className="activity-title">{note.title}</div>
                    <div className="activity-meta">
                      <span>Reviewed {formatDate(note.lastReviewed)}</span>
                      <span className={note.successCount > note.reviewCount / 2 ? 'text-success' : 'text-warning'}>
                        {note.successCount}/{note.reviewCount} successful
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {notes.length === 0 && (
        <div className="card text-center">
          <h3>No data to display</h3>
          <p className="text-muted">
            Start creating and reviewing notes to see your statistics here!
          </p>
        </div>
      )}
    </div>
  );
};

export default Stats;
