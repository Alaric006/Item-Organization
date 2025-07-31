import React from 'react';
import './BottomNavbar.css';

interface BottomNavbarProps {
  listNames: string[];
  onNavigate: (listName: string) => void;
  isVisible: boolean;
}

const BottomNavbar: React.FC<BottomNavbarProps> = ({ listNames, onNavigate, isVisible }) => {
  if (!isVisible) return null;

  return (
    <nav className={`bottom-navbar ${isVisible ? 'visible' : ''}`}>
      <div className="navbar-content">
        {listNames.map((listName) => (
          <button
            key={listName}
            className="nav-button"
            onClick={() => onNavigate(listName)}
          >
            <span className="nav-text">{listName}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default BottomNavbar;