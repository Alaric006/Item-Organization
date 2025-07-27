import React, {useState, useCallback} from 'react';
import './ItemList.css';

export interface Item {
    id: string;
    name: string;
}

interface ItemListProps {
    listName: string;
    listItems: Item[];
    addItem: (itemName: string) => void;
    removeItem: (itemID: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({listName, listItems, addItem, removeItem}) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = () => {
        if (inputValue.trim()) {
            addItem(inputValue.trim());
            setInputValue('');
        }
    };

    const handleRemoveItem = useCallback((id: string) => () => removeItem(id), [removeItem]);

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
                    <li key={item.id} className='item-list-elem'>
                        <p> {item.name}</p>
                        <button className='remove-item-btn' onClick={handleRemoveItem(item.id)}>-</button>
                    </li>
                ))}  
            </ul>
        </div>
    )
}

export default ItemList;