import React from 'react';
import './Header.css';

interface HeaderProps {
  currentUser: string;
  users: string[];
  onUserChange: (user: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, users, onUserChange }) => {
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
          >
            {users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      </div>
    </header>
  );
};

export default Header;