import { useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_URL}/tasks`);
      const data = await res.json();
      setTasks(data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description: newTask }),
      });
      if (res.ok) {
        const task = await res.json();
        setTasks([task, ...tasks]);
        setNewTask('');
      }
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTasks(tasks.filter(task => task.id !== id));
      }
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Task Manager</h1>

        <form className="task-form" onSubmit={addTask}>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a task..."
            className="task-input"
          />
          <button type="submit" className="add-btn">
            Add
          </button>
        </form>

        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span className="task-text">{task.description}</span>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-btn"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
