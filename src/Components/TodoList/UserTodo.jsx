import { useState, useEffect } from "react"
import '../../Stylesheets/scribeAnimation.css'
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"
import '../../Stylesheets/editTodoDetailAnimation.css'
import { useAppStateStore } from "../../store/appStateStore"

export default function UserTodo({todo, refetchData, innerRef=undefined, setQueryOn, ...rest}) {

  const processDateToString = (data) => {
    if(data) {
      let year = `${data.getFullYear()}-`;
      let month = data.getMonth();
      if(month < 10) {
        month = `0${month + 1}-`
      } else {
        month = `${month + 1}-`
      }
      let date = data.getDate();
      if(date < 10) {
        date = `0${date}`
      }
      return year.concat(month, date);
    } else {
      return null;
    }

  }

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
  const [priorityValue, setPriorityValue] = useState(todo.priority);
  const [inputValue, setInputValue] = useState(todo.todo);
  const [isCompleted, setIsCompleted] = useState(todo.done);
  const [dateValue, setDateValue] = useState(todo.date);
  const [isDetailEditMode, setIsDetailEditMode] = useState(false);

  const todoData = {
    todo : inputValue,
    priority : priorityValue,
    done : isCompleted,
    date : dateValue
  }

  const updateTodoData = () => {
    return axios.patch(`http://localhost:5862/listboards/${listId}`, {userId : useAppStateStore.getState().userIdToken, todoId : todo._id, todoData})
  }

  const deleteTodoData = () => {
    return axios.delete(`http://localhost:5862/listboards/${listId}`, {data: {todoId : todo._id, listId}});
  }

  const {mutate : updateTodo} = useMutation({mutationKey : ['updateTodo'], mutationFn : updateTodoData, onSuccess: ()=> {
    refetchData();
    setIsEditMode(false);
    setIsDetailEditMode(false);
  }});

  const {mutate : deleteTodo} = useMutation({mutationKey : ['deleteTodo'], mutationFn : deleteTodoData});


  const deleteHandler = () => {
    deleteTodo();
    setQueryOn(true);
    refetchData();
  }

  const completeModeHandler = (e) => {
    e.stopPropagation()
    setIsCompleted(!isCompleted);
  }

  const updateHandler = (e) => {
    e.stopPropagation();
    updateTodo();
    setQueryOn(true);
  }

  useEffect(() => {
    updateTodo();
  }, [isCompleted])

  if(isCompleted) {
    return (
      <li {...rest || undefined} ref={innerRef || undefined} onClick={completeModeHandler}>
      <div className="flex h-[55px] justify-between items-center p-2 border rounded-xl todolist-container completed border-neutral-800 mb-2 hover:cursor-grab">
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
          <i className="icon completed fa-solid fa-pencil mr-2 hover:cursor-pointer text-yellow-600 hover:translate-y-[-3px] hover:text-yellow-300"></i>
          <i className="icon completed fa-solid fa-xmark text-red-600 hover:cursor-pointer mr-2 hover:translate-y-[-3px] hover:text-red-400"></i>
        </div>
      </div>
    </li>
    )
  } 
    return (
      <li {...rest || undefined} ref={innerRef || undefined} onClick={!isEditMode && completeModeHandler}>
        <div className={`group h-[55px] todo-container flex justify-between items-center border-[0.5px] p-2 rounded-xl border-neutral-800 mb-2 ${ isEditMode? "bg-editmode border-amber-500" : "bg-[#474759]" } ${isEditMode ? '' : 'hover:bg-primary hover:border-primary'} drop-shadow-md hover:cursor-grab hover:translate-y-[-3px] ease-in-out duration-75`}>
          <div className="flex flex-col justify-center pl-3 left-0">
              {
                isEditMode 
                ? <input onChange={(e) => {setInputValue(e.target.value)}} onClick={(e) => {e.stopPropagation()}} value={inputValue} className="rounded-lg mb-1 pl-2 bg-editinput"></input> 
                : <p className="max-w-max todo pb-1"> {todo.todo}</p>
              }
            <div className="flex">
              {todo.priority > 0 && 
              <>
                <i className={`${priorityClassNameList[todo.priority - 1]} text-xs todo-info`}></i>
                <p className="ml-1 mr-2 text-xs todo-info">{priorityList[todo.priority - 1]}</p>
              </> 
              }
              {
                todo.date && <p className="text-xs group-hover:text-white text-neutral-400 todo-date">{`Until ${new Date(todo.date).toLocaleString('ko-KR', dateOption)}`}</p>
              }
            </div>
          </div>
          <div className="flex">
            <div className={`flex todo-detail ${isDetailEditMode && 'editmode '}mr-4`}>
                <input onClick={(e) => {e.stopPropagation()}} onChange={(e) => {setDateValue(new Date(e.target.value))}} defaultValue={processDateToString(new Date(todo.date))} className="rounded-xl mr-2 px-2 bg-secondary-lighter hover:cursor-pointer text-xs" type="date"></input>
                <select onClick={(e) => {e.stopPropagation()}} defaultValue={priorityValue} onChange={(e) => {setPriorityValue(e.target.value)}} className="rounded-xl pl-2 bg-secondary-lighter hover:cursor-pointer text-xs">
                  <option value={1}>urgent</option>
                  <option value={2}>important</option>
                  <option value={0}>none</option>
                </select>
              </div>
            <div className="flex">
              {isDetailEditMode 
              ? <i onClick={updateHandler} className="fa-solid fa-circle-check text-sm mr-2 hover:cursor-pointer text-emerald-600 hover:translate-y-[-3px] hover:text-emerald-300 ease-in-out duration-75"></i>
              :  <i onClick={(e)=>{
                e.stopPropagation()
                setIsEditMode(!isEditMode)}} className="fa-solid fa-pencil text-sm mr-2 hover:cursor-pointer text-yellow-400 hover:translate-y-[-3px] hover:text-yellow-300 ease-in-out duration-75"></i>
              }
              {isEditMode
               ? <i onClick={updateHandler} className="fa-solid fa-circle-check text-sm mr-2 hover:cursor-pointer text-emerald-600 hover:translate-y-[-3px] hover:text-emerald-300 ease-in-out duration-75"></i>
               :  <i onClick={(e) => {
                e.stopPropagation();
                setIsDetailEditMode(!isDetailEditMode)}} className="fa-solid fa-circle-info text-sm mr-2 hover:cursor-pointer hover:translate-y-[-3px] text-sky-400 hover:text-sky-200 ease-in-out duration-75"></i>  
              }
              <i onClick={deleteHandler} className="fa-solid fa-trash text-sm text-neutral-800 hover:cursor-pointer mr-2 hover:translate-y-[-3px] hover:text-red-400 ease-in-out duration-75"></i>
            </div>
          </div>
        </div>
      </li>
    )

}
