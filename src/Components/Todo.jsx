import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function Todo() {
  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    padding: "5%",
    backgroundColor: "green",
    color: "white",
  };

  const [name, setName] = useState("");
  const [tasks, setTasks] = useState([
    { taskId: uuidv4(), name: "clean", completed: false, updating: false },
    { taskId: uuidv4(), name: "read", completed: true, updating: false },
    { taskId: uuidv4(), name: "study", completed: false, updating: false },
  ]);

  const handleAddTask = (event) => {
    event.preventDefault();

    // Add to tasks
    setTasks([
      { taskId: uuidv4(), name: name, completed: false, updating: false },
      ...tasks,
    ]);

    // Reset name
    setName("");
  };

  const handleUpdateClick = (taskId) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.taskId === taskId ? { ...task, updating: true } : task
      )
    );
  };

  const handleUpdateEnter = (event, taskId) => {
    if (event.key === "Enter") {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.taskId === taskId
            ? { ...task, name: event.target.value, updating: false }
            : task
        )
      );
    }
  };

  const handleDelete = (taskId) => {
    setTasks((tasks) => tasks.filter((task) => task.taskId !== taskId));
  };

  const handleCheck = (event, taskId) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.taskId === taskId
          ? { ...task, completed: event.target.checked }
          : task
      )
    );
  };

  return (
    <div style={style}>
      <h1>Todo</h1>
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ height: "30px", width: "200px" }}
        />
      </form>
      <ul style={{ width: "100%", listStyleType: "none" }}>
        {tasks.map((task) => (
          <div
            key={task.taskId}
            style={{
              margin: "5% 0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input
                type="checkbox"
                onChange={(event) => handleCheck(event, task.taskId)}
                defaultChecked={task.completed}
              />

              <li onClick={() => handleUpdateClick(task.taskId)}>
                {task.updating ? (
                  <input
                    type="text"
                    autoFocus={true}
                    defaultValue={task.name}
                    onKeyDown={(evt) => handleUpdateEnter(evt, task.taskId)}
                  />
                ) : (
                  task.name
                )}
              </li>
            </div>

            <button onClick={() => handleDelete(task.taskId)}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Todo;

// Add, update, delete
