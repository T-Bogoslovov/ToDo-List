import React, { useState, useEffect } from "react";
import "./App.css";
//Importing custom components
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";

function App() {
  //State Stuff
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  const appName = ["Welcome!", "This is a simple 'To-do' list" ];
  //Save to Local
  // const saveLocalTodos = () => {
  //   localStorage.setItem("todos", JSON.stringify(todos));
  // };
  // Error: React Hook useEffect has missing dependencies: 'filterHandler' and 
  //'saveLocalTodos'. Either include them or remove the dependency array.

  //Save to Local
  const saveLocalTodos = React.useCallback(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  //Get from Local
  const getLocalTodos = () => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let localTodo = JSON.parse(localStorage.getItem("todos"));
      setTodos(localTodo);
    }
  };

  //RUN ONCE WHEN THE APP START
  useEffect(() => {
    getLocalTodos();
  }, []);

  //Use effect
  useEffect(() => {
    //Function refactored filterHandler
    const filterHandler = () => {
        switch (status) {
          case "completed":
            setFilteredTodos(todos.filter((todo) => todo.completed === true));
            break;
          case "uncompleted":
            setFilteredTodos(todos.filter((todo) => todo.completed === false));
            break;
          default:
            setFilteredTodos(todos);
            break;
        }
      }
    filterHandler();
    saveLocalTodos();
  }, [todos, status, saveLocalTodos]);


  //Functions
  // const filterHandler = () => {
  //   switch (status) {
  //     case "completed":
  //       setFilteredTodos(todos.filter((todo) => todo.completed === true));
  //       break;
  //     case "uncompleted":
  //       setFilteredTodos(todos.filter((todo) => todo.completed === false));
  //       break;
  //     default:
  //       setFilteredTodos(todos);
  //       break;
  //   }
  // };

  return (
    <div className="App">
      <header>
        <h1>{appName[0]}</h1>
        <p>{appName[1]}</p>
      </header>
      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
      />
      <TodoList
        setTodos={setTodos}
        todos={todos}
        filteredTodos={filteredTodos}
      />
      <footer>
      <h3>🚧 Continuous deployment test 🚧</h3>
      </footer>
      
    </div>
  );
}

export default App;
