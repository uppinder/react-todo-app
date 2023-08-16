import { Provider } from "react-redux";
import store from "./store";
import "./App.css";
import Todo from "./Components/Todo";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Todo />
      </Provider>
    </div>
  );
}

export default App;
