import React, { useState } from 'react';
import Header from './components/Header';
import ItemList from './components/ItemList';
import { Item } from './types';
import './App.css';

function App() {
  
  const users = ['Unassigned', 'Alaric', 'Andrew', 'Joseph', 'Tanish'];

  const [currentUser, setCurrentUser] = useState(users[0]);

  const [needToBuy, setNeedToBuy] = useState<Item[]>([]);
  const [wantToBuy, setWantToBuy] = useState<Item[]>([]);

  const handleUserChange = (user: string) => {
    setCurrentUser(user);
  };

  const createAddItemFunction = (currentList: Item[], setList: React.Dispatch<React.SetStateAction<Item[]>>) => {
    return (itemName: string) => {
      const newItem: Item = {
        id: crypto.randomUUID(),
        name: itemName,
        assignedTo: currentUser
      };
      setList([...currentList, newItem]);
    };
  };

  const createRemoveItemFunction = (currentList: Item[], setList: React.Dispatch<React.SetStateAction<Item[]>>) => {
    return (removeID: string) => {
      setList(currentList.filter(item => item.id !== removeID));
    };
  };

  const createUpdateItemNameFunction = (currentList: Item[], setList: React.Dispatch<React.SetStateAction<Item[]>>) => {
    return (id: string, newName: string) => {
      setList(currentList.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName};
        } else {
          return item;
        }
      }));
    };
  };

  const createUpdateItemAssignedToFunction = (currentList: Item[], setList: React.Dispatch<React.SetStateAction<Item[]>>) => {
    return (id: string, newAssignedTo: string) => {
      setList(currentList.map((item) => {
        if (item.id === id) {
          return { ...item, assignedTo: newAssignedTo};
        } else {
          return item;
        }
      }));
    }
  }

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
              updateItemName={createUpdateItemNameFunction(needToBuy, setNeedToBuy)}
              updateItemAssignedTo={createUpdateItemAssignedToFunction(needToBuy, setNeedToBuy)}
              users={users}
            />
            <ItemList
              listName='Want to Bring'
              listItems={wantToBuy}
              addItem={createAddItemFunction(wantToBuy, setWantToBuy)}
              removeItem={createRemoveItemFunction(wantToBuy, setWantToBuy)}
              updateItemName={createUpdateItemNameFunction(wantToBuy, setWantToBuy)}
              updateItemAssignedTo={createUpdateItemAssignedToFunction(wantToBuy, setWantToBuy)}
              users={users}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
