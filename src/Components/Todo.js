import React from "react";

const Todo = ({ text, todo, todos, setTodos }) => {
  // let date = new Date();
  
  //Events
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
    // console.log(todo);
  };
  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed,
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="todo">
      {/* <div className="date">
        <p style={{ marginLeft: "1rem" }}>{date.toLocaleTimeString()}</p>
      </div> */}
      <li className={`todo-item ${todo.completed ? "completed" : ''}`}>
        {text}
      </li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default Todo;
