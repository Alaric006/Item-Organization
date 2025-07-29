import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import ItemList from './components/ItemList';
import { DatabaseItem, DatabaseUser, Item, User } from './types';
import { loadItems, loadUsers, loadLists, transformDatabaseItemToComponent } from "./services/database";
import './App.css';

function App() {
  const [users, setUsers] = useState<DatabaseUser[]>([]);
  const [items, setItems] = useState<DatabaseItem[]>([])
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string>("Unassigned");

  const needList = useMemo(() => mapItemsToList("need"), [items]);
  const wantToBringList = useMemo(() => mapItemsToList("want_to_bring"), [items]);
  const willBringList = useMemo(() => mapItemsToList("will_bring"), [items]);
  const willBuyList = useMemo(() => mapItemsToList("will_buy"), [items]);

  // Loads Content from Database
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usersData, itemsData] = await Promise.all([loadUsers(), loadItems()]);

        setUsers(usersData);
        setItems(itemsData);

        const unassignedInUsers = (user: DatabaseUser) => user.name === "Unassigned";

        if (usersData.length > 0) {
          if (usersData.some(unassignedInUsers)) {
            setCurrentUser("Unassigned");
          } else {
            setCurrentUser(usersData[0].name);
          }
        }
      } catch (err) {
        setError("Failed to load data from database");
        console.error("Error: ", err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  /** UTILITY FUNCTIONS */
  function mapItemsToList(list_name: string): Item[] {
    if (!items || items.length === 0) {
      return [];
    }
    return items.filter(item => item.list_id.name === list_name)
      .map(transformDatabaseItemToComponent);
  }

  function dbUserToUserName(user: DatabaseUser): string {
    return user.name;
  }


  const handleUserChange = (userName: string) => {
    setCurrentUser(userName);
  };

  return (
    <div className="App">
      <Header 
        currentUser={currentUser}
        users={users.map(dbUserToUserName)}
        onUserChange={handleUserChange}
        loading={loading}
      />
      <main className="main-content">
        <div className="main-container">
          <h2>📦 Add move in items here!</h2>
          <div className='lists-container'>
            <ItemList
              listName="Need"
              listItems={needList}
              users={users.map(dbUserToUserName)}
              addItem={() => {}}
              removeItem={() => {}}
              updateItemName={() => {}}
              updateItemAssignedTo={() => {}}
            />
            <ItemList
              listName="Want to Bring"
              listItems={wantToBringList}
              users={users.map(dbUserToUserName)}
              addItem={() => {}}
              removeItem={() => {}}
              updateItemName={() => {}}
              updateItemAssignedTo={() => {}}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
