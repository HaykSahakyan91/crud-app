import React, { useEffect, useState } from "react";
import "./App.css"; // Import external CSS

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [hoveredTaskId, setHoveredTaskId] = useState(null);
  const [addButtonHovered, setAddButtonHovered] = useState(false);

  // Set your live backend URL directly
  //const API_URL = "https://crud-backend-k6n6.onrender.com";
  //const API_URL = "http://localhost:3001"; 
  const API_URL = process.env.REACT_APP_API_URL;


  useEffect(() => {
    fetch(`${API_URL}/api/tasks`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched tasks:", data);
        setTasks(data);
      })
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    fetch(`${API_URL}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    })
      .then((res) => res.json())
      .then((data) => {
        setTasks((prev) => [...prev, data]);
        setNewTitle("");
      })
      .catch((err) => console.error("Error adding task:", err));
  };

  const toggleComplete = (id) => {
    fetch(`${API_URL}/api/tasks/${id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((updatedTask) => {
        setTasks((prev) =>
          prev.map((task) => (task.id === updatedTask.id ? updatedTask : task))
        );
      })
      .catch((err) => console.error("Error toggling task:", err));
  };

  const deleteTask = (id) => {
    fetch(`${API_URL}/api/tasks/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
      })
      .catch((err) => console.error("Error deleting task:", err));
  };

  return (
    <div className="container">
      <h1 className="title">📝 Task List</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Enter task title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="input"
        />
        <button
          type="submit"
          className={`add-button ${addButtonHovered ? "hovered" : ""}`}
          onMouseEnter={() => setAddButtonHovered(true)}
          onMouseLeave={() => setAddButtonHovered(false)}
        >
          Add
        </button>
      </form>

      <ul className="task-list">
        {tasks.map((task) => {
          const isHovered = hoveredTaskId === task.id;
          return (
            <li key={task.id} className="task-item">
              <span
                onClick={() => toggleComplete(task.id)}
                onMouseEnter={() => setHoveredTaskId(task.id)}
                onMouseLeave={() => setHoveredTaskId(null)}
                className={`task-text ${
                  isHovered
                    ? task.completed
                      ? "hover-complete"
                      : "hover-incomplete"
                    : ""
                }`}
                title="Click to change status"
              >
                {task.title} —{" "}
                <span
                  className={
                    task.completed ? "status-complete" : "status-incomplete"
                  }
                >
                  {task.completed ? "✅ Completed" : "❌ Not completed"}
                </span>
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
