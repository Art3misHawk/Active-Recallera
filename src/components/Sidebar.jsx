import React from 'react';
import { noteService } from '../services/noteService';

const Sidebar = ({ currentView, onNavigate, onAddNote, collapsed, onToggleCollapse, notes }) => {
  const stats = noteService.getStats();
  
  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Home', 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
      )
    },
    { 
      id: 'study', 
      label: 'Study', 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
        </svg>
      ),
      badge: stats.due + stats.overdue > 0 ? stats.due + stats.overdue : null
    },
    { 
      id: 'library', 
      label: 'Library', 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm16-4H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 9H9V9h10v2zm-4 4H9v-2h6v2zm4-8H9V5h10v2z"/>
        </svg>
      ),
      badge: notes.length > 0 ? notes.length : null
    },
    { 
      id: 'stats', 
      label: 'Analytics', 
      icon: (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>
        </svg>
      )
    }
  ];

  const handleStudyClick = () => {
    if (stats.due + stats.overdue > 0) {
      onNavigate('study');
    } else {
      onNavigate('dashboard');
    }
  };

  return (
    <div className={`claude-sidebar ${collapsed ? 'collapsed' : ''}`}>
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <div className="sidebar-brand">
          {!collapsed && (
            <div className="brand-text">
              <h1 className="brand-title">Active Recaller</h1>
              <p className="brand-subtitle">Spaced Repetition</p>
            </div>
          )}
        </div>
        
        <button 
          className="btn btn-icon btn-ghost sidebar-toggle"
          onClick={onToggleCollapse}
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            {collapsed ? (
              <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/>
            ) : (
              <path d="M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"/>
            )}
          </svg>
        </button>
      </div>

      {/* Quick Actions */}
      <div className="sidebar-section">
        <button 
          className="btn btn-primary sidebar-action"
          onClick={onAddNote}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
          </svg>
          {!collapsed && <span>New Note</span>}
        </button>
        
        {(stats.due + stats.overdue > 0) && (
          <button 
            className="btn btn-secondary sidebar-action study-action"
            onClick={handleStudyClick}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            {!collapsed && (
              <span>
                Study Now
                <span className="study-count">({stats.due + stats.overdue})</span>
              </span>
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="nav-section">
          {!collapsed && <div className="nav-title">Navigation</div>}
          <ul className="nav-list">
            {navigationItems.map(item => (
              <li key={item.id} className="nav-item">
                <button
                  className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                  onClick={() => {
                    if (item.id === 'study') {
                      handleStudyClick();
                    } else {
                      onNavigate(item.id);
                    }
                  }}
                  title={collapsed ? item.label : undefined}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {!collapsed && (
                    <>
                      <span className="nav-label">{item.label}</span>
                      {item.badge && (
                        <span className="nav-badge">{item.badge}</span>
                      )}
                    </>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Stats Summary */}
      {!collapsed && (
        <div className="sidebar-section sidebar-stats">
          <div className="nav-title">Quick Stats</div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">{stats.due}</div>
              <div className="stat-label">Due Today</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.overdue}</div>
              <div className="stat-label">Overdue</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.total}</div>
              <div className="stat-label">Total</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">{stats.averageSuccessRate}%</div>
              <div className="stat-label">Success</div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="sidebar-footer">
        {!collapsed && (
          <div className="footer-content">
            <p className="footer-text">
              Keep learning, stay curious
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
