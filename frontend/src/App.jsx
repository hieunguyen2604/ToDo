import React, { useState, useEffect } from 'react';
import { taskService, authService } from './services/api';
import { Plus, Trash2, CheckCircle, Clock } from 'lucide-react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 0 });

  useEffect(() => {
    if (isLoggedIn) {
      loadTasks();
    }
  }, [isLoggedIn]);

  const loadTasks = async () => {
    try {
      const res = await taskService.getTasks();
      setTasks(res.data);
    } catch (err) {
      console.error('Failed to load tasks', err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await authService.login(username, password);
    if (res.success) setIsLoggedIn(true);
    else alert(res.message);
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await taskService.createTask(newTask);
      setNewTask({ title: '', description: '', status: 0 });
      loadTasks();
    } catch (err) {
      alert('Failed to create task');
    }
  };

  const handleDelete = async (id) => {
    await taskService.deleteTask(id);
    loadTasks();
  };

  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <form className="card" onSubmit={handleLogin}>
          <h2>Login to ToDo</h2>
          <div className="input-group">
            <label>Username (admin)</label>
            <input value={username} onChange={e => setUsername(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Password (password)</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1>Task Management (CI/CD Enabled)</h1>
        <button onClick={() => { authService.logout(); setIsLoggedIn(false); }} style={{ width: 'auto', padding: '0.5rem 1rem' }}>Logout</button>
      </header>

      <form className="card" style={{ maxWidth: 'none', marginBottom: '2rem' }} onSubmit={handleCreateTask}>
        <h3>Create New Task</h3>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input placeholder="Title" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} required />
          <input placeholder="Description" value={newTask.description} onChange={e => setNewTask({...newTask, description: e.target.value})} />
          <select value={newTask.status} onChange={e => setNewTask({...newTask, status: parseInt(e.target.value)})}>
            <option value={0}>Todo</option>
            <option value={1}>In Progress</option>
            <option value={2}>Completed</option>
          </select>
          <button type="submit" style={{ width: 'auto' }}><Plus size={20} /></button>
        </div>
      </form>

      <div className="task-grid">
        {tasks.map(task => (
          <div key={task.id} className="task-card">
            <div className="task-status">
              {task.status === 0 && <Clock size={14} />}
              {task.status === 1 && 'Running'}
              {task.status === 2 && <CheckCircle size={14} color="#10b981" />}
            </div>
            <h3>{task.title}</h3>
            <p style={{ color: '#94a3b8' }}>{task.description}</p>
            <button 
              onClick={() => handleDelete(task.id)} 
              style={{ background: '#ef4444', marginTop: '1rem', width: 'auto', padding: '0.5rem' }}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
