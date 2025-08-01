import React from 'react';

const Header = ({ currentView, onNavigate, onAddNote }) => {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'library', label: 'Library', icon: '📚' },
    { id: 'stats', label: 'Stats', icon: '📊' }
  ];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <a href="#" className="logo" onClick={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
              🧠 Active Recaller
            </a>
            
            <nav className="nav">
              {navigationItems.map(item => (
                <a
                  key={item.id}
                  href="#"
                  className={`nav-link ${currentView === item.id ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate(item.id);
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
          
          <div className="header-right">
            <button 
              className="btn btn-primary"
              onClick={onAddNote}
            >
              ➕ Add Note
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
