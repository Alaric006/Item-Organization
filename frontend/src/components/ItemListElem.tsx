import React, {useState} from "react"
import './ItemListElem.css'
import { Item } from '../types'

interface ItemListElemProps {
    item: Item;
    onRemove: (id: string) => void;
    onUpdateName: (id: string, newName: string) => void;
    onUpdateAssignedTo: (id: string, newAssignedTo: string) => void;
    users: string[];
}

const ItemListElem: React.FC<ItemListElemProps> = ({item, onRemove, onUpdateName, onUpdateAssignedTo, users}) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [editValue, setEditValue] = useState(item.name);
    const [isEditingAssignedTo, setIsEditingAssignedTo] = useState(false);

    function handleSave() {
        if (editValue === '') {
            setEditValue("You must provide a name...");
        } else {
            onUpdateName(item.id, editValue);
            setIsEditingName(false);
        }
    }

    function handleAssignedToChange(newAssignedTo: string) {
        onUpdateAssignedTo(item.id, newAssignedTo);
        setIsEditingAssignedTo(false);
    }
    return (
        <li key={item.id} className='item-list-elem'>
            <div className="item-content">
                {
                !isEditingName ? (
                    <p onClick={() => setIsEditingName(true)}>{item.name}</p>
                ) : (
                    <input
                        type="text"
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleSave();
                            } else if (e.key === 'Escape') {
                                setIsEditingName(false);
                                setEditValue(item.name);
                            }
                        }}
                        onBlur={handleSave}
                        autoFocus
                    />
                )}
                {
                !isEditingAssignedTo ? (
                    <span className="assigned-to" onClick={() => setIsEditingAssignedTo(true)}>
                        Assigned to: {item.assignedTo}
                    </span>
                ) : (
                    <select
                        value={item.assignedTo}
                        onChange={(e) => handleAssignedToChange(e.target.value)}
                        onBlur={() => setIsEditingAssignedTo(false)}
                        autoFocus
                    >
                        {users.map(user => (
                            <option key={user} value={user}>{user}</option>
                        ))}
                    </select>
                )}
            </div>
            <button className='remove-item-btn' onClick={() => onRemove(item.id)}>-</button>
        </li>
    )
}

export default ItemListElem;