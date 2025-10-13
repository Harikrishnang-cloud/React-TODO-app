import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodos] = useState('') 

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addTodo = () => {
    setTodos([...todos, {list:todo, id:Date.now(), status:false}]);
    // console.log(todos);
    setTodo("");
  };

  const onDelete = (id) =>{
    setTodos(todos.filter((y)=>y.id !== id ))
  }
  const onComplete = (id) =>{
    let complete = todos.map((a)=>{
      if(a.id === id){
        return ({...a, status:!a.status})
      }
      console.log(a)
      return a
    })
    setTodos(complete)
  }
  const onEdit = (x)=>{
    setEditTodos(x)
    setTodo(x.list)
    console.log(x.list)
  }
  const handledEdit = ()=>{
    const newData = todos.map((t)=>{
      if(t.id == editTodo.id){
        return {...t, list:todo}
      }
      return t
    })
    setTodos(newData)
  }
  const inputRef = useRef("null");
  useEffect(() => {
    inputRef.current.focus();
    console.log(inputRef.current);
  }); //dependancy ella

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Please Enter your to-do"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        ></input>
        <button onClick={editTodo ? handledEdit : addTodo}>{editTodo ? "EDIT" : "ADD"}</button>
      </form>
      <div className="list">
        <ul>
          {todos.map((x) => (
            <li className="list-items">
              <div className="list-item-list" id={x.status ? 'list-item':''}>{x.list}</div>
              <span>
                <IoMdDoneAll
                  className="list-item-icons"
                  id="complete"
                  title="Complete"
                  onClick={()=>onComplete(x.id)}
                />
                <CiEdit 
                className="list-item-icons" 
                id="edit" 
                title="Edit" 
                onClick={()=>onEdit(x)}
                />
                <MdDelete
                  className="list-item-icons"
                  id="delete"
                  title="Delete"
                  onClick={()=>onDelete(x.id)}
                />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;

