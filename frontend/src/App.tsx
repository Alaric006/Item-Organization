import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from './components/Header';
import ItemList from './components/ItemList';
import BottomNavbar from './components/BottomNavbar';
import { DatabaseItem, DatabaseList, DatabaseUser, Item, User } from './types';
import { loadItems, loadUsers, loadLists, transformDatabaseItemToComponent, dateToSQLFormat} from "./services/database";
import {addItem, removeItem, updateItemName, updateItemAssignedTo} from "./services/api"
import './App.css';

function App() {
  const [users, setUsers] = useState<DatabaseUser[]>([]);
  const [items, setItems] = useState<DatabaseItem[]>([]);
  const [lists, setLists] = useState<DatabaseList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<string>("Unassigned");
  const [showNavbar, setShowNavbar] = useState<boolean>(false);
  
  const listRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // Loads Content from Database
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [usersData, itemsData, listsData] = await Promise.all([loadUsers(), loadItems(), loadLists()]);

        setUsers(usersData);
        setItems(itemsData);
        setLists(listsData);

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

  // Scroll detection logic for bottom navbar
  useEffect(() => {
    const checkHeight = () => {
      const pageHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const shouldShow = pageHeight > viewportHeight * 1.5; // Show when content is 50% taller than viewport
      
      setShowNavbar(shouldShow);
      
      // Add/remove body class for styling adjustments
      if (shouldShow) {
        document.body.classList.add('navbar-visible');
      } else {
        document.body.classList.remove('navbar-visible');
      }
    };

    // Check on mount and when content changes
    checkHeight();
    
    // Check on scroll and resize
    const handleScroll = () => checkHeight();
    const handleResize = () => checkHeight();
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.body.classList.remove('navbar-visible');
    };
  }, [lists, items]); // Re-run when content changes

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

  const createAddItemFunction = (listName: string) => {
    return async (itemName: string) => {
      // Optimisitic update -- Add to UI Immediately
      const listId = lists.find(dbList => dbList.name === listName);
      const assignedToId = users.find(dbUser => dbUser.name === currentUser);

      if(!listId || !assignedToId) {
        console.error("Could not find list or user!");
        return;
      }

      const tempItem: DatabaseItem = {
        id: crypto.randomUUID(),
        name: itemName,
        created_at: dateToSQLFormat(new Date()),
        updated_at: dateToSQLFormat(new Date()),
        list_id: listId,
        assigned_to: assignedToId
      }
      setItems(prevItems => [...prevItems, tempItem]);

      // Now Add to Database
      try {
        await addItem(itemName, assignedToId.id, listId.id);

        const updatedItems = await loadItems();
        setItems(updatedItems);
      } catch (error) {
        // Filter out optimistic addition
        setItems(prevItems => prevItems.filter(item => item.id !== tempItem.id));
        console.error("Failed to add item:", error);
      }
    }
  }

  const createRemoveItemFunction = (listName: string) => {
    return async (removeId: string) => {

      const itemToRemoveIndex: number = items.findIndex(dbItem => dbItem.id === removeId);

      if(itemToRemoveIndex === -1) {
        console.error("Could not find item to remove!");
        return;
      }

      const itemToRemove = items[itemToRemoveIndex];

      // Optimistic removal -- Remove from UI Immediately
      setItems(items => items.filter(dbItem => dbItem.id !== removeId));

      // Now remove from database
      try {
        await removeItem(removeId);

        const updatedItems = await loadItems();
        setItems(updatedItems);
      } catch (error) {
        // Re-add optimistic removal
        let prevItems: DatabaseItem[] = items.slice(0, itemToRemoveIndex).concat([itemToRemove], items.slice(itemToRemoveIndex + 1, items.length + 1));
        setItems(prevItems);
        console.error("Failed to remove item:", error);
      }
    }
  }

  const createUpdateItemNameFunction = (listName: string) => {
    return async (id: string, newName: string) => {
      // Optimistically update name
      const oldItem: DatabaseItem | undefined = items.find(dbItem => dbItem.id === id);
      if (!oldItem) {
        console.error("Could not find item to update name!");
        return;
      }
      const oldName: string = oldItem.name;

      setItems(prevItems => prevItems.map((item: DatabaseItem) => {
        if (item.id === id) {
          return {...item, name: newName}
        } else {
          return item;
        }
      }));

      // Now (attempt to) update the database
      try {
        await updateItemName(id, newName);
        const updatedItems = await loadItems();
        setItems(updatedItems);
      } catch (error) {
        // Undo optimistic update
        setItems(prevItems => prevItems.map((item: DatabaseItem) => {
          if (item.id === id) {
            return {...item, name: oldName}
          } else {
            return item;
          }
        }));

        console.error("Error failed to update item name:", error);
      }
    }
  }

  const createUpdateItemAssignedTo = (listName: string) => {
    return async (id: string, newAssignedTo: string) => {
      // Find newAssignedTo User ID with name
      const newAssignedToUser: DatabaseUser | undefined = users.find(user => user.name === newAssignedTo);
      if (!newAssignedToUser) {
        console.error("Could not finding matching user!");
        return;
      }

      // Find current assignedTo User ID
      const matchingItem = items.find(item => item.id === id);
      if (!matchingItem) {
        console.error("Could not find matching item!");
        return;
      }

      // Get user IDs
      const newAssignedToId = newAssignedToUser.id;
      const oldAssignedToId = matchingItem.assigned_to.id;

      // Get User Names of assignedTo
      const oldAssignedTo = matchingItem.assigned_to.name;


      // Optimistic update
      const updatedItems: DatabaseItem[] = items.map((item: DatabaseItem) => {
        if (item.id === id) {
          return {...item, assigned_to: {id: newAssignedToId, name: newAssignedTo}};
        } else {
          return item;
        }
      });
      setItems(updatedItems);

      // Update Database
      try {
        await updateItemAssignedTo(id, newAssignedToId);
        const updatedItems = await loadItems();
        setItems(updatedItems);
      } catch (error) {
        // Undo optimistic update
        const prevItems: DatabaseItem[] = items.map((item: DatabaseItem) => {
          if (item.id === id) {
            return {...item, assigned_to: {id: oldAssignedToId, name: oldAssignedTo}};
          } else {
            return item;
          }
        });
        setItems(prevItems);
        
        console.error("Failed to update item assigned_to:", error);
      }
    }
  }

  // Navigation handler for bottom navbar
  const handleNavigateToList = (listDisplayName: string) => {
    const listKey = lists.find(list => list.display_name === listDisplayName)?.name;
    if (listKey && listRefs.current[listKey]) {
      listRefs.current[listKey]?.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  };

  const itemListElems = lists.map((list, index) => {
    return (
      <div 
        key={list.name} 
        ref={el => { listRefs.current[list.name] = el; }}
        className="list-section"
      >
        <ItemList
          listName={list.display_name}
          listItems={mapItemsToList(list.name)}
          users={users.map(dbUserToUserName)}
          addItem={createAddItemFunction(list.name)}
          removeItem={createRemoveItemFunction(list.name)}
          updateItemName={createUpdateItemNameFunction(list.name)}
          updateItemAssignedTo={createUpdateItemAssignedTo(list.name)}
        />
      </div>
    );
  });

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
            {itemListElems}
          </div>
        </div>
      </main>
      <BottomNavbar 
        listNames={lists.map(list => list.display_name)}
        onNavigate={handleNavigateToList}
        isVisible={showNavbar}
      />
    </div>
  );
}

export default App;
