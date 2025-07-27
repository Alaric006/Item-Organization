import React, { useState } from 'react';
import Header from './components/Header';
import ItemList, { Item } from './components/ItemList';
import './App.css';

function App() {
  const [currentUser, setCurrentUser] = useState('Alex');
  
  const users = ['Alex', 'Jamie', 'Sam', 'Taylor'];

  const [needToBuy, setNeedToBuy] = useState<Item[]>([]);
  const [wantToBuy, setWantToBuy] = useState<Item[]>([]);

  const handleUserChange = (user: string) => {
    setCurrentUser(user);
  };

  const createAddItemFunction = (currentList: Item[], setList: React.Dispatch<React.SetStateAction<Item[]>>) => {
    return (itemName: string) => {
      const newItem: Item = {
        id: crypto.randomUUID(),
        name: itemName
      };
      setList([...currentList, newItem]);
    };
  };

  const createRemoveItemFunction = (currentList: Item[], setList: React.Dispatch<React.SetStateAction<Item[]>>) => {
    return (removeID: string) => {
      setList(currentList.filter(item => item.id !== removeID));
    };
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
              addItem={createAddItemFunction(needToBuy, setNeedToBuy)}
              removeItem={createRemoveItemFunction(needToBuy, setNeedToBuy)}
            />
            <ItemList
              listName='Want to Bring'
              listItems={wantToBuy}
              addItem={createAddItemFunction(wantToBuy, setWantToBuy)}
              removeItem={createRemoveItemFunction(wantToBuy, setWantToBuy)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
