import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', completed: false });

  const token = localStorage.getItem('access_token');

  const fetchTasks = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/tasks/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      alert('Failed to fetch tasks');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/tasks/', newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewTask({ title: '', description: '', completed: false });
      fetchTasks();
    } catch (err) {
      alert('Failed to create task');
    }
  };

  <button onClick={() => {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  window.location.href = '/login';
}}>
  Logout
</button>


  return (
    <div>
      <h2>Your Tasks</h2>

      <form onSubmit={handleCreate}>
        <input
          type="text"
          placeholder="Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <strong>{task.title}</strong> - {task.completed ? '✅' : '❌'}  
            <button onClick={async () => {
            try {
                await axios.put(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
                    ...task,
                    completed: !task.completed,
                }, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchTasks();
                } catch {
                alert('Error updating task');
                }
            }}>
                Toggle
            </button>

            <button onClick={async () => {
                try {
                await axios.delete(`http://127.0.0.1:8000/api/tasks/${task.id}/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                fetchTasks();
                } catch {
                alert('Error deleting task');
                }
            }}>
                Delete
            </button>
          </li>

        ))}
      </ul>
    </div>
  );
}
