import React, { useState } from 'react';
import './toDoList.css';

const TodoList = () => {
    const [items, setItems] = useState([]);
    const [task, setTask] = useState("");
    const [editingIndex, setEditingIndex] = useState(null); 
    const [editingText, setEditingText] = useState(""); 

    const handleAddedTask = () => {
        if (task) {
            setItems([...items, task]);
            setTask('');
        }
    };

    const deleteItem = (indexToDelete) => {
        setItems(items.filter((_, index) => index !== indexToDelete));
    };

    const startEditing = (index) => {
        setEditingIndex(index);
        setEditingText(items[index]);
    };

    const saveEdit = (index) => {
        const updatedItems = items.map((item, i) => (i === index ? editingText : item));
        setItems(updatedItems);
        setEditingIndex(null);
        setEditingText('');
    };

    const cancelEdit = () => {
        setEditingIndex(null);
        setEditingText('');
    };

    const itemsList = items.map((item, index) => (
        <li key={index}>
            {editingIndex === index ? (
                <>
                    <input
                        type="text"
                        value={editingText}
                        onChange={(e) => setEditingText(e.target.value)}
                    />
                    <button onClick={() => saveEdit(index)}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                </>
            ) : (
                <>
                    {item} &nbsp;
                    <button onClick={() => startEditing(index)}>Edit</button>
                    <button onClick={() => deleteItem(index)}>Done</button>
                </>
            )}
        </li>
    ));

    return (
        <div>
            <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                placeholder="Add new task"
            />
            <button onClick={handleAddedTask}>Add item</button>

            <ul>
                {itemsList}
            </ul>
        </div>
    );
};

export default TodoList;
