const addTodo = (todoName) => {
  return {
    type: "ADD_TODO",
    payload: todoName,
  };
};

const updatingTodo = (todoId) => {
  return {
    type: "UPDATING_TODO",
    payload: todoId,
  };
};

const updateTodo = (todoId, name) => {
  return {
    type: "UPDATE_TODO",
    payload: {
      todoId,
      name,
    },
  };
};

const toggleCheck = (todoId, completed) => {
  return {
    type: "TOGGLE_TODO",
    payload: {
      todoId,
      completed,
    },
  };
};

const deleteTodo = (todoId) => {
  return {
    type: "DELETE_TODO",
    payload: todoId,
  };
};

export { addTodo, updatingTodo, updateTodo, toggleCheck, deleteTodo };
