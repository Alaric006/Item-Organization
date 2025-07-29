import React from 'react';
import './Header.css';

interface HeaderProps {
  currentUser: string;
  users: string[];
  onUserChange: (user: string) => void;
  loading?: boolean;
}

const Header: React.FC<HeaderProps> = ({ currentUser, users, onUserChange, loading = false }) => {
  return (
    <header className="header-banner">
      <div className="header-content">
        <h1 className="header-title">🏠 Roommate Moving Tracker</h1>
        <div className="user-selector">
          <label htmlFor="user-dropdown" className="user-label">
            Current User:
          </label>
          <select
            id="user-dropdown"
            className="user-dropdown"
            value={currentUser}
            onChange={(e) => onUserChange(e.target.value)}
            disabled={loading}
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
          {loading && (
            <div className="loading-indicator">
              <div className="loading-spinner">⏳</div>
              <span className="loading-text">Loading...</span>
            </div>
          )}
        </div>
      </div>
      {loading && (
        <div className="loading-bar-container">
          <div className="loading-bar"></div>
        </div>
      )}
    </header>
  );
};

export default Header;