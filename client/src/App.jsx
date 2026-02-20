import "./App.css";

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
