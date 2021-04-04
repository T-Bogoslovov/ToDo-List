import React from "react";

import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../CSS/toastify.css";

const Form = ({ setInputText, todos, setTodos, inputText, setStatus }) => {
  //Here i can write javascript code and function, w/e...
  const inputTextHandler = (e) => {
    setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    let date = new Date();
    let fullDate = date.getDate()+'-'+(date.getMonth()+1)+'-'+date.getFullYear();
    e.preventDefault();
    //Input validator
    if (inputText !== "") {
      setTodos([
        ...todos,
        { text: inputText, completed: false, id: Math.random() * 1000, dateAdded: fullDate },
      ]);
    } else {
      toast.error("Task name is required!", {
        position: "top-center",
        autoClose: 3000,
        transition: Slide,
        closeOnClick: true,
        draggable: true,
        hideProgressBar: false,
      });
    }
    setInputText("");
  };
  const statusHandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <div>
      <form>
        <input
          value={inputText}
          onChange={inputTextHandler}
          type="text"
          className="todo-input"
        />
        <button
          onClick={submitTodoHandler}
          className="todo-button"
          type="submit"
        >
          <i className="fas fa-plus-square"></i>
        </button>
        <div className="select">
          <select onChange={statusHandler} name="todos" className="filter-todo">
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </select>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        limit={1}
      />
    </div>
  );
};

export default Form;
