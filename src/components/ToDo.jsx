import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEdit } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { baseURL } from "../utils/constant";
import moment from "moment";

const ToDo = () => {
  const [toDos, setToDos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    // Fetch todos on component mount
    fetchToDos();
  }, [input]);

  const fetchToDos = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          userId: userId,
        },
      };
      
      const response = await axios.get(
        "https://todoappbackend-3och.onrender.com/get",
        config
      );
      const formattedTodos = response.data.map((todo) => ({
        ...todo,
        formattedCreatedAt: formatCreatedAt(todo.createdAt), 
      }));
      setToDos(formattedTodos);
    } catch (error) {
      console.error(error);
    }
  };

  const formatCreatedAt = (createdAt) => {
    const now = moment();
    const todoCreatedAt = moment(createdAt);
    const diffInMinutes = now.diff(todoCreatedAt, "minutes");

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min ago`;
    } else if (diffInMinutes < 1440) {
      // Less than 1 day (24 hours)
      const diffInHours = Math.floor(diffInMinutes / 60);
      return `${diffInHours} h ago`;
    } else {
      const diffInDays = Math.floor(diffInMinutes / 1440);
      return `${diffInDays} d ago`;
    }
  };

  const saveToDo = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        userId: userId,
      },
    };
    axios
      .post(
        "https://todoappbackend-3och.onrender.com/save",
        { toDo: input, createdAt: Date.now() },
        config
      )
      .then((res) => {
        setInput("");
        fetchToDos();
      })
      .catch((err) => console.log(err));
  };

  const deleteToDo = (id) => {
    axios
      .delete("https://todoappbackend-3och.onrender.com/delete/${id}")
      .then((res) => {
        console.log(res.data);
        fetchToDos(); // Refresh the todos after deletion
      })
      .catch((err) => console.log(err));
  };

  const updateToDo = (id, newText) => {
    axios
      .put(`https://todoappbackend-3och.onrender.com/update/${id}`, {
        toDo: newText,
      })
      .then((res) => {
        console.log(res.data);
        fetchToDos();
      })
      .catch((err) => console.log(err));
  };

  const toggleCompleted = (id, completed) => {
    axios
      .put(`https://todoappbackend-3och.onrender.com/update/${id}`, {
        completed: !completed,
      })
      .then((res) => {
        fetchToDos();
      })
      .catch((err) => console.log(err));
  };

  const formatDate = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className="container">
      <div className="todo-container">
        <h1 className="todo-title">ToDo App</h1>
        <div className="input-holder">
          <input
            className="todo-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Add a ToDo..."
          />
          <button className="add-button" onClick={saveToDo}>
            Add
          </button>
        </div>
        <div className="todo-list">
          {toDos.map((el) => (
            <div
              key={el._id}
              className={`todo-item ${el.completed ? "completed" : ""}`}
            >
              <div
                className="todo-text"
                onClick={() => toggleCompleted(el._id, el.completed)}
              >
                {el.toDo}
              </div>
              <div className="todo-created-date">
                Created {formatDate(el.createdAt)}
              </div>
              <div className="icon-container">
                <button
                  className="done-button"
                  onClick={() => toggleCompleted(el._id, el.completed)}
                >
                  Done
                </button>
                <AiFillEdit
                  className="icon"
                  onClick={() => {
                    const newText = prompt("Enter updated ToDo:");
                    if (newText !== null) updateToDo(el._id, newText);
                  }}
                />
                <RxCross1 className="icon" onClick={() => deleteToDo(el._id)} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToDo;
