import React, { useState } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (taskInput.trim() === '') return;
    setTasks([...tasks, { id: Date.now(), text: taskInput, completed: false }]);
    setTaskInput('');
  };

  const toggleTaskCompletion = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true; // all tasks
  });

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <input 
        type="text" 
        value={taskInput} 
        onChange={(e) => setTaskInput(e.target.value)} 
        placeholder="Add a new task" 
      />
      <button onClick={addTask}>Add Task</button>
      
      <div>
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>
      
      <ul>
        {filteredTasks.map(task => (
          <li key={task.id} style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
            <span onClick={() => toggleTaskCompletion(task.id)}>
              {task.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;