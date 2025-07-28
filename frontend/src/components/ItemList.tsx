import React, {useState, useCallback} from 'react';
import ItemListElem, {Item} from "./ItemListElem";
import './ItemList.css';


interface ItemListProps {
    listName: string;
    listItems: Item[];
    addItem: (itemName: string) => void;
    removeItem: (itemID: string) => void;
    updateItemName: (id: string, newName: string) => void;
    updateItemAssignedTo: (id: string, newAssignedTo: string) => void;
    users: string[];
}

const ItemList: React.FC<ItemListProps> = ({listName, listItems, addItem, removeItem, updateItemName, updateItemAssignedTo, users}) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = () => {
        if (inputValue.trim()) {
            addItem(inputValue.trim());
            setInputValue('');
        }
    };

    const handleRemoveItem = useCallback((id: string) => removeItem(id), [removeItem]);

    return (
        <div className='item-list-container'>
            <h2>{listName}:</h2>
            <span className='add-span'>
                <input type='text'
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddItem()}
                    placeholder="Add item..."
                />
                <button className='add-button' onClick={handleAddItem}>+</button>
            </span>
            <ul className='item-list'>
                {listItems.map((item) => (
                    <ItemListElem
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveItem}
                        onUpdateName={updateItemName}
                        onUpdateAssignedTo={updateItemAssignedTo}
                        users={users}
                    />
                ))}  
            </ul>
        </div>
    )
}

export default ItemList;