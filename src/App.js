import React, { useState, useEffect, useCallback } from "react";
import "./CSS/App.css";
//Importing custom components
import Form from "./Components/Form";
import TodoList from "./Components/TodoList";

function App() {
  //State Stuff
  const appInfo = ["Welcome!", "This is a simple 'To-do' list app." ];
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);

  //Save to Local
  const saveLocalTodos = useCallback(() => {
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

  return (
    <div className="App">
      <header>
        <h1>{appInfo[0]}</h1>
        <p>{appInfo[1]}</p>
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
      
    </div>
  );
}

export default App;
