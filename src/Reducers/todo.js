import { v4 as uuidv4 } from "uuid";

const initialTodoAppState = {
  todoList: [
    { todoId: uuidv4(), name: "clean", completed: false, updating: false },
    { todoId: uuidv4(), name: "read", completed: true, updating: false },
    { todoId: uuidv4(), name: "study", completed: false, updating: false },
  ],
};

const changeState = (state = initialTodoAppState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        todoList: [
          ...state.todoList,
          {
            todoId: uuidv4(),
            name: action.payload,
            completed: false,
            updating: false,
          },
        ],
      };

    case "UPDATING_TODO":
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.todoId === action.payload ? { ...todo, updating: true } : todo
        ),
      };

    case "UPDATE_TODO":
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.todoId === action.payload.todoId
            ? { ...todo, name: action.payload.name, updating: false }
            : todo
        ),
      };

    case "TOGGLE_TODO":
      return {
        ...state,
        todoList: state.todoList.map((todo) =>
          todo.todoId === action.payload.todoId
            ? { ...todo, completed: action.payload.completed }
            : todo
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todoList: state.todoList.filter(
          (todo) => todo.todoId !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default changeState;
