import { useState } from "react"
import '../../Stylesheets/scribeAnimation.css'
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"

export default function UserTodo({todo, updateListData}) {
  const dateOption = {
    year : 'numeric',
    month : 'numeric',
    day : 'numeric',
    time : 'none'
  }
  const listId = useParams().id;
  const priorityList = ['urgent', 'important'];
  const priorityClassNameList = ['fa-solid fa-fire text-red-400', "fa-solid fa-bolt-lightning text-yellow-500"]
  const [isEditMode, setIsEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(todo.todo);
  const [isCompleted, setIsCompleted] = useState(todo.done);

  const updateTodo = () => {
    return axios.patch(`http://localhost:5862/listboards/${listId}`, {userId : "6386ee119d102ce4d8b627d7", todoId : todo._id, newTodo: inputValue})
  }

  const deleteTodoData = () => {
    return axios.delete(`http://localhost:5862/listboards/${listId}`, {data: {todoId : todo._id}});
  }

  const {isLoading, data, mutate} = useMutation({mutationKey : ['updateTodo'], mutationFn : updateTodo, onSuccess: ()=> {
    updateListData();
    setIsEditMode(false);
  }});
  const {mutate : deleteTodo} = useMutation({mutationKey : ['deleteTodo'], mutationFn : deleteTodoData});

  const submitHandler = (e) => {
    e.stopPropagation()
    mutate();
  }

  const changeHandler = (e) => {
    setInputValue(e.target.value)
  }

  const deleteHandler = () => {
    deleteTodo();
    updateListData()
  }

  const clickHandler = (e) => {
    setIsEditMode(false);
  }

  if(isEditMode) {
    return(
      <li onBlur={() => {setIsEditMode(false)}} onClick={clickHandler} className="flex justify-center items-center border-b-2 border-slate-500 mb-2 hover:bg-sky-800/40 hover:border-sky-900 hover:cursor-grab todolist-container drop-shadow-lg">
        <div className="flex flex-col">
          <input className="w-60" onClick={(e) => {e.stopPropagation()}} onChange={changeHandler} value={inputValue}/>
          <div>
            <p>Priority Check</p>
            <div>
              <i className="fa-solid fa-fire text-red-400"/>
              <p className="text-sm ml-2">Urgent</p>
            </div>
            <div>
              <i className="fa-solid fa-bolt-lightning text-yellow-400"/>
              <p className="text-sm ml-2">Important</p>
            </div>
            <div>
              <i className="fa-solid fa-xmark"></i>
              <p className="text-sm ml-2">none</p>
            </div>
          </div>
        </div>
        <i className="fa-solid fa-circle-check text-green-600 mr-4" onClick={submitHandler}></i>
      </li>
    )
  }
  else if(isCompleted) {
    return (
      <li onClick={() => {setIsCompleted(false)}} className="flex justify-between items-center p-2 border rounded-xl todolist-container completed border-neutral-800 mb-2 hover:cursor-grab">
      <div className="flex flex-col pl-3">
        <p className="todo completed max-w-max"> {todo.todo}</p>
        <div className="flex">
          {todo.priority > 0 && 
          <>
            <i className={`${priorityClassNameList[todo.priority - 1]} text-xs todo-info completed`}></i>
            <p className="ml-1 mr-2 text-xs todo-info completed">{priorityList[todo.priority - 1]}</p>
          </> 
          }
          {
            todo.date && <p className="text-xs text-neutral-500 todo-date completed">{`Until ${new Date(todo.date).toLocaleString('ko-KR', dateOption)}`}</p>
          }
        </div>
      </div>
      <div className="flex">
        <i className="fa-solid fa-arrow-rotate-right text-sm mr-2 text-sky-600 hover:cursor-pointer hover:translate-y-[-3px] hover:text-sky-400"></i>
        <i className="fa-solid fa-circle-check text-sm mr-2 text-green-700 hover:cursor-pointer hover:translate-y-[-3px] hover:text-green-500"></i>
        <i onClick={()=>{setIsEditMode(!isEditMode)}} className="icon completed fa-solid fa-pencil mr-2 hover:cursor-pointer text-yellow-600 hover:translate-y-[-3px] hover:text-yellow-300"></i>
        <i onClick={deleteHandler} className="icon completed fa-solid fa-xmark text-red-600 hover:cursor-pointer mr-2 hover:translate-y-[-3px] hover:text-red-400"></i>
      </div>
    </li>
    )
  } 
  else {
    return (
      <li onClick={() => {setIsCompleted(true)}} className="flex justify-between items-center p-2 border rounded-xl border-neutral-800 mb-2 bg-neutral-800 hover:bg-sky-800/40 hover:border-sky-900 hover:cursor-grab hover:translate-y-[-3px] ease-in duration-[50ms]">
        <div className="flex flex-col pl-3">
          <p className="todo max-w-max"> {todo.todo}</p>
          <div className="flex">
            {todo.priority > 0 && 
            <>
              <i className={`${priorityClassNameList[todo.priority - 1]} text-xs todo-info`}></i>
              <p className="ml-1 mr-2 text-xs todo-info">{priorityList[todo.priority - 1]}</p>
            </> 
            }
            {
              todo.date && <p className="text-xs text-neutral-500 todo-date">{`Until ${new Date(todo.date).toLocaleString('ko-KR', dateOption)}`}</p>
            }
          </div>
        </div>
        <div className="flex">
          <i onClick={()=>{setIsEditMode(!isEditMode)}} className="fa-solid fa-pencil text-sm mr-2 hover:cursor-pointer text-yellow-600 hover:translate-y-[-3px] hover:text-yellow-300"></i>
          <i onClick={deleteHandler} className="fa-solid fa-trash text-sm text-neutral-600 hover:cursor-pointer mr-2 hover:translate-y-[-3px] hover:text-red-400"></i>
        </div>
      </li>
    )

  }

}
