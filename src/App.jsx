import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([
    {
      label: "Learn JavaScript",
      isChecked: true,
    },
    {
      label: "Learn React",
      isChecked: false,
    },
    {
      label: "Have a life!",
      isChecked: false,
    },
  ]);

  const [filteredTodos, setfilteredTodos] = useState(todos);

  const [statusFilter, setStatusFilter] = useState("All");

  const [activeTodosLength, setActiveTodosLength] = useState();

  const changeCheckBox = (todo) => {
    const myTodo = todos.find((td) => td == todo);
    myTodo.isChecked = !todo.isChecked;
    setTodos([...todos]);
  };

  const filterAll = () => {
    setStatusFilter("All");
    setfilteredTodos(todos);
  };

  const filterSelectedTodo = () => {
    setStatusFilter("Completed");

    const selectedTodos = todos.filter((todo) => todo.isChecked === true);

    setfilteredTodos(selectedTodos);
  };

  const filterActiveTodo = () => {
    setStatusFilter("Active");

    const activeTodos = todos.filter((todo) => todo.isChecked === false);

    setfilteredTodos(activeTodos);
  };

  const clearCompletedTodo = () => {
    const activeTodos = todos.filter((todo) => todo.isChecked === false);
    setTodos(activeTodos);
    setfilteredTodos(todos);
  };

  const removeTodo = (todo) => {
    const myTodoIndex = todos.indexOf(todo);
    todos.splice(myTodoIndex, 1);

    setTodos(todos);
    setfilteredTodos(todos);
  };

  useEffect(() => {
    const activeTodos = todos.filter((todo) => todo.isChecked === false);
    setActiveTodosLength(activeTodos.length);
  }, [todos]);
  return (
    <div>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        <section className="main">
          <input className="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>

          <ul className="todo-list">
            {filteredTodos.map((todo, i) => {
              return (
                <li key={i} className={todo.isChecked ? "completed" : ""}>
                  <div className="view">
                    <input
                      className="toggle"
                      type="checkbox"
                      checked={todo.isChecked}
                      onChange={() => {
                        changeCheckBox(todo);
                      }}
                    />
                    <label>{todo.label}</label>
                    <button
                      className="destroy"
                      onClick={() => removeTodo(todo)}
                    ></button>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
        <footer className="footer">
          <span className="todo-count">
            <strong>{activeTodosLength}</strong>
            items left
          </span>

          <ul className="filters">
            <li>
              <a
                href="#/"
                className={statusFilter === "All" ? "selected" : ""}
                onClick={filterAll}
              >
                All
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={statusFilter === "Active" ? "selected" : ""}
                onClick={filterActiveTodo}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/"
                className={statusFilter === "Completed" ? "selected" : ""}
                onClick={filterSelectedTodo}
              >
                Completed
              </a>
            </li>
          </ul>

          <button className="clear-completed" onClick={clearCompletedTodo}>
            Clear completed
          </button>
        </footer>
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}

export default App;
