import React, { useState } from 'react';
import Header from './components/Header';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState('Alex');
  
  const users = ['Alex', 'Jamie', 'Sam', 'Taylor'];

  const handleUserChange = (user: string) => {
    setCurrentUser(user);
  };


  return (
    <div className="App">
      <Header 
        currentUser={currentUser}
        users={users}
        onUserChange={handleUserChange}
      />
      <main className="main-content">
        <div className="content-placeholder">
          <h2>📦 Items will be displayed here!</h2>
          <p>Current User: <strong>{currentUser}</strong></p>
        </div>
      </main>
    </div>
  );
}

export default App;
