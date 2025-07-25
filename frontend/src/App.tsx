import React, { useState } from 'react';
import Header from './components/Header';
import ViewModeMenu, { ViewMode } from './components/ViewModeMenu';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState('Alex');
  const [viewMode, setViewMode] = useState<ViewMode>('all');
  
  const users = ['Alex', 'Jamie', 'Sam', 'Taylor'];

  const handleUserChange = (user: string) => {
    setCurrentUser(user);
  };

  const handleModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <div className="App">
      <Header 
        currentUser={currentUser}
        users={users}
        onUserChange={handleUserChange}
      />
      <ViewModeMenu 
        currentMode={viewMode}
        onModeChange={handleModeChange}
      />
      <main className="main-content">
        <div className="content-placeholder">
          <h2>📦 Items will be displayed here!</h2>
          <p>Current User: <strong>{currentUser}</strong></p>
          <p>Current View: <strong>{viewMode}</strong></p>
        </div>
      </main>
    </div>
  );
}

export default App;
