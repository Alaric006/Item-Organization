import React, {useState} from "react"
import './ItemListElem.css'

export interface Item {
    id: string;
    name: string;
}

interface ItemListElemProps {
    item: Item;
    onRemove: (id: string) => void;
    onUpdate: (id: string, newName: string) => void;
}

const ItemListElem: React.FC<ItemListElemProps> = ({item, onRemove, onUpdate}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState(item.name);

    function handleSave() {
        if (editValue === '') {
            setEditValue("You must provide a name...");
        } else {
            onUpdate(item.id, editValue);
            setIsEditing(false);
        }
    }
    return (
        <li key={item.id} className='item-list-elem'>
            {
            !isEditing ? (
                <p onClick={() => setIsEditing(true)}>{item.name}</p>
            ) : (
                <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSave();
                        } else if (e.key === 'Escape') {
                            setIsEditing(false);
                            setEditValue(item.name);
                        }
                    }}
                    onBlur={handleSave}
                    autoFocus
                />
            )}
            <button className='remove-item-btn' onClick={() => onRemove(item.id)}>-</button>
        </li>
    )
}

export default ItemListElem;