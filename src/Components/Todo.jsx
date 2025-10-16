import React from "react";
import "./Todo.css";
import { useState, useRef, useEffect } from "react";
import { IoMdDoneAll } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";


function Todo() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null) 
  const [msg,setMsg] = useState("")


  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const addTodo = () => {
    let trimTodo = todo.trim()
    
    let regex = /^[a-zA-Z0-9.,:;_%+-]+$/;
    if(!regex.test(trimTodo)){
    setMsg("please enter valid inputs...")
    return
    }

    let isDuplicate = todos.some(
      (t)=>t.list.toLowerCase() === todo.toLowerCase()
    )
    if(isDuplicate){
      setMsg("This TODO is already exists...")
      return
    }

    setTodos([...todos, {list:todo.trim(), id:Date.now(), status:false}]);
    // console.log(todos);
    setTodo("");
    setMsg("")
  };

  const onDelete = (id) =>{
    setTodos(todos.filter((y)=>y.id !== id ))
    alert("Are you sure you want to delete this todo?")
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
    setEditTodo(x)
    setTodo(x.list)
    console.log(x.list)
  }
  const handledEdit = ()=>{
    if(todo.trim()===""){
      setMsg("TODO Cannot be null value ")
      return  
    }
    const newData = todos.map((t)=>t.id == editTodo.id ? {...t,list:todo.trim()}:t)
    setTodos(newData)

    setTodo("")
    setMsg("")
    setEditTodo(null)
  }

  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
    console.log(inputRef.current);
  }); //dependancy ella

  useEffect(() => {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    try {
      setTodos(JSON.parse(storedTodos));
    } catch (e) {
      console.error("Failed to parse todos from localStorage", e);
      setTodos([]);
    }
  }
}, []);
  useEffect(()=>{
    localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])

  return (
    <div className="container">
      <h2>TODO APP</h2>
      <form className="form-group" onSubmit={handleSubmit}>
        <div style={{"flexGrow": 1}}>
          <input
          type="text"
          value={todo}
          ref={inputRef}
          placeholder="Please Enter your to-do"
          className="form-control"
          onChange={(event) => setTodo(event.target.value)}
        ></input>
        {msg && <p style={{color:"red",marginTop:"5px",fontSize:"14px"}}>{msg}</p>}
        </div>
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

