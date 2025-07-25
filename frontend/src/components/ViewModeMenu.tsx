import React from 'react';
import './ViewModeMenu.css';

export type ViewMode = 'all' | 'status' | 'user';

interface ViewModeMenuProps {
  currentMode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

const ViewModeMenu: React.FC<ViewModeMenuProps> = ({ currentMode, onModeChange }) => {
  const modes = [
    { key: 'all' as ViewMode, label: '📋 All Items', icon: '📋' },
    { key: 'status' as ViewMode, label: '📊 By Status', icon: '📊' },
    { key: 'user' as ViewMode, label: '👥 By User', icon: '👥' },
  ];

  return (
    <nav className="view-mode-menu">
      <div className="menu-container">
        {modes.map((mode) => (
          <button
            key={mode.key}
            className={`mode-button ${currentMode === mode.key ? 'active' : ''}`}
            onClick={() => onModeChange(mode.key)}
          >
            <span className="mode-icon">{mode.icon}</span>
            <span className="mode-text">{mode.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};

export default ViewModeMenu;