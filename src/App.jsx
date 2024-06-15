import React, { useState, useEffect } from "react";
import "./App.css";
import Addtodo from "./components/Addtodo";
import Todos from "./components/Todos";
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    const response = await axios.get("https://65e85ff24bb72f0a9c4f1aca.mockapi.io/User");
    setTodos(response.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="nav">
          <h1 className="name">MY TODO APP</h1>
        </div>
      </div>
      <div className="row back">
        <div className="col-9">
          <div className="todolist">
            <h4>My Todo List :</h4>
          </div>
          <div className="todobody">
            <Todos todos={todos} fetchTodos={fetchTodos} />
          </div>
        </div>
        <div className="col-3">
          <div className="todolist">
            <h4>Add Todo List :</h4>
          </div>
          <div className="sidebar">
            <Addtodo fetchTodos={fetchTodos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
