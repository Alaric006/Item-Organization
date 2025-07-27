import React, {useState} from 'react';
import './ItemList.css';

interface ItemListProps {
    listName: string;
    listItems: string[];
    addItem: (itemName: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({listName, listItems, addItem}) => {
    const [inputValue, setInputValue] = useState('');

    const handleAddItem = () => {
        if (inputValue.trim()) {
            addItem(inputValue.trim());
            setInputValue('');
        }
    };

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
                    <li key={item} className='item-list-elem'><p>{item}</p></li>
                ))}  
            </ul>
        </div>
    )
}

export default ItemList;