import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const todoState = useSelector((state) => state.todoState);
  const dispatch = useDispatch();

  const handleAddTodo = (event) => {
    event.preventDefault();
    dispatch({ type: "ADD_TODO", payload: name });
    setName("");
  };

  const handleUpdateClick = (todoId) => {
    // Only dispatch if not already updating
    const todo = todoState.todoList.find((todo) => todo.todoId === todoId);

    if (!todo.updating) {
      dispatch({ type: "UPDATING_TODO", payload: todoId });
    }
  };

  const handleUpdateEnter = (event, todoId) => {
    if (event.key === "Enter") {
      dispatch({
        type: "UPDATE_TODO",
        payload: { todoId: todoId, name: event.target.value },
      });
    }
  };

  const handleToggleCheck = (event, todoId) => {
    dispatch({
      type: "TOGGLE_TODO",
      payload: { todoId: todoId, completed: event.target.checked },
    });
  };

  const handleDelete = (todoId) => {
    dispatch({ type: "DELETE_TODO", payload: todoId });
  };

  return (
    <div style={style}>
      <h1>Todo</h1>
      <form onSubmit={handleAddTodo}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ height: "30px", width: "200px" }}
        />
      </form>
      <ul style={{ width: "100%", listStyleType: "none" }}>
        {todoState.todoList.map((todo) => (
          <div
            key={todo.todoId}
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
                onChange={(event) => handleToggleCheck(event, todo.todoId)}
                defaultChecked={todo.completed}
              />

              <li onClick={() => handleUpdateClick(todo.todoId)}>
                {todo.updating ? (
                  <input
                    type="text"
                    autoFocus={true}
                    defaultValue={todo.name}
                    onKeyDown={(evt) => handleUpdateEnter(evt, todo.todoId)}
                  />
                ) : (
                  todo.name
                )}
              </li>
            </div>

            <button onClick={() => handleDelete(todo.todoId)}>delete</button>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default Todo;

// Add, update, delete
