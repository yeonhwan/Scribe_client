import { useState } from "react"
import '../../Stylesheets/scribeAnimation.css'

export default function Todo
  ({index, 
    todo, 
    id, 
    removeTodo, 
    updateTodo, 
    handleDragStart, 
    handleDragEnter, 
    handleDragEnd}) 

{  
  const [editTodo, setEditTodo] = useState(false);
  const [updateTodoInput, setUpdateTodoInput] = useState(todo)
  const [completeTodo, setCompleteTodo] = useState(false);

  const updateHandler = () => {
    updateTodo(id, updateTodoInput);
    setEditTodo(!editTodo)
  }

  const inputHandler = (e) => {
    setUpdateTodoInput(e.target.value);
  }

  const enterHandler = (e, id, updateTodoInput) => {
    if(e.key === 'Enter') {
      updateTodo(id, updateTodoInput);
      setEditTodo(!editTodo)
    }
  }

  return (
    <li className={completeTodo === false && editTodo === false
      ? "flex justify-between items-center border-b-2 border-slate-500 mb-2 hover:bg-sky-800/40 hover:border-sky-900 hover:cursor-grab" 
      : "flex justify-between items-center bg-neutral-600 mb-2 hover:cursor-grab"} 
    draggable
    onDragOver={(e)=>{e.preventDefault()}}
    onDragStart={(e)=>{handleDragStart(e, index)}}
    onDragEnter={(e)=>{handleDragEnter(e, index)}}
    onDragEnd={(e)=>{handleDragEnd(e)}}
    >

    {completeTodo === false && editTodo === false ?
    <>
    <p className="hover:cursor-pointer ml-1.5" onClick={() => {setCompleteTodo(!completeTodo)}}>{todo}</p>
    <div>
    <i className="fa-solid fa-pencil pr-1.5 pt-0.5 hover:cursor-pointer hover:text-yellow-500 hover:-translate-y-0.5" 
       onClick={() => {setEditTodo(!editTodo)}}></i> 

    <i className="fa-solid fa-xmark pr-1.5 hover:cursor-pointer hover:text-rose-500 hover:-translate-y-0.5"
       onClick={() => {removeTodo(id, index)}}></i>
    </div>
    </>
    : completeTodo === true && editTodo === false ?
      <>
      <p className="completed hover:cursor-pointer ml-1.5"
         onClick={() => {setCompleteTodo(!completeTodo)}}>{todo}</p>
      <div>
      <i className="fa-solid fa-xmark pr-1.5 hover:cursor-pointer text-slate-400 hover:text-slate-900"
         onClick={() => {removeTodo(id, index)}}></i>
      </div>
      </> 
      :
      <>
      <input value={updateTodoInput}
             className="pl-2 w-11/12 h-6"
             onChange={(e) => {inputHandler(e)}}
             onBlur={updateHandler}
             onKeyUp={(e) => {enterHandler(e, id, updateTodoInput)}}></input>
      <div>
        <i className="fa-solid fa-circle-check pr-1.5 hover:cursor-pointer hover:text-green-500 hover:-translate-y-0.5" 
           onClick={updateHandler}></i>

        <i className="fa-solid fa-xmark pr-1.5 hover:cursor-pointer hover:text-rose-500 hover:-translate-y-0.5"
           onClick={() => {removeTodo(id, index)}}></i>
      </div>
      </>
    }

    </li>
  )
}
