import React, { useState } from 'react';
import Header from './components/Header';
import ItemList from './components/ItemList';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState('Alex');
  
  const users = ['Alex', 'Jamie', 'Sam', 'Taylor'];

  const [needToBuy, setNeedToBuy] = useState<string[]>([]);
  const [wantToBuy, setWantToBuy] = useState<string[]>([]);

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
        <div className="main-container">
          <h2>📦 Add move in items here!</h2>
          <div className='lists-container'>
            <ItemList
              listName='Need to Buy'
              listItems={needToBuy}
              addItem={(itemName) => {setNeedToBuy([...needToBuy, itemName])}}
            />
            <ItemList
              listName='Want to Bring'
              listItems={wantToBuy}
              addItem={(itemName) => {setWantToBuy([...wantToBuy, itemName])}}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
