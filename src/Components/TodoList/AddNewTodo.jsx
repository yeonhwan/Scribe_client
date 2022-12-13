import { useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import '../../Stylesheets/newTodoAnimation.css'
import '../../Stylesheets/fonts.css'
import { useParams } from "react-router-dom";

export default function AddNewTodo({setIsAddMode, isAddMode, refetchData}) {
  const [todoInput, setTodoInput] = useState('')
  const [todoPriority, setTodoPriority] = useState(0);
  const [dateInput, setDateInput] = useState(null);
  const [isDateMode, setIsDateMode] = useState(false);
  const listId = useParams().id;

  useEffect(()=>{
    if(isDateMode) {
      setDateInput(new Date(Date.now()));
    } else {
      setDateInput(null);
    }
  }, [isDateMode])

  useEffect(() => {
    if(!isAddMode) {
      setTodoPriority(0);
    }
  }, [isAddMode])

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

  const todoData = {
    todo : todoInput,
    priority : todoPriority,
    date : dateInput ? new Date(dateInput) : null
  }

  const addNewTodoData = () => {
    return axios.post(`http://localhost:5862/listboards/${listId}/create/newtodo`, {todoData});
  }

  const addNewTodoHandler = () => {
    if(todoInput) {
      addNewTodo();
      refetchData();
      setIsAddMode(false);
      setIsDateMode(false);
      setTodoInput('');
      setDateInput(null);
      setTodoPriority(0);
    } else {
      window.alert('You cannot create empty todo. please fill in the input');
    }
  }

  const dateModeHandler = () => {
    setIsDateMode(!isDateMode);
  }

  const {mutate : addNewTodo} = useMutation({mutationKey : ['addNewTodo'], mutationFn : addNewTodoData, onSuccess: refetchData})

  return (
    <div className={isAddMode? 'flex flex-col rounded-lg items-center absolute z-10 top-48 left-50 bg-neutral-900/40 w-[400px] h-[400px] backdrop-blur-md border border-neutral-700 drop-shadow-lg newtodo-form-open'
                             :  'flex flex-col rounded-lg items-center absolute z-10 top-48 left-50 bg-neutral-900/40 w-[400px] h-[400px] backdrop-blur-md border border-neutral-700 drop-shadow-lg newtodo-form'}>
        <h1 className='text-2xl my-6 font-anton tracking-wide'>Add New Todo</h1>
      <div className='flex flex-col w-3/4'>
          <label htmlFor='todo-name-input' >Type in your Todo</label>
          <input required placeholder='New Todo' id='todo-name-input' className='my-2 pl-2 rounded-lg' onChange={(e)=>{setTodoInput(e.target.value)}} value={todoInput}/>
          <label htmlFor='todo-priority' >Select Priority of Todo</label>
          <select onChange={(e) => {setTodoPriority(e.target.value)}} value={todoPriority} id='todo-priority' className='mt-2 mb-8 rounded-lg'>
            <option value={1}>🔥 Urgent</option>
            <option value={2}>⚡ Important</option>
            <option value={0}>None</option>
          </select>
          {
            isDateMode?
            <div onClick={dateModeHandler} className="bg-slate-500 flex flex-col justify-center items-center rounded-xl pt-2 hover:cursor-pointer date-container open">
              <div className="flex">
                <p className="hover:cursor-pointer">Add a Deadline</p>
                <i className="fa-solid fa-angle-down pt-2 text-sm ml-2 arrow open"></i>
              </div>
                <input className="px-2 mb-2 rounded-lg date-input open hover:cursor-text" onClick={(e) => {e.stopPropagation()}} type="date" value={processDateToString(dateInput)} onChange={(e)=>{setDateInput(new Date(e.target.value))}}></input>
            </div> 
            :
            <div onClick={dateModeHandler} className="flex flex-col pt-2 justify-center items-center rounded-xl bg-slate-500 hover:cursor-pointer date-container">
              <div className="flex">
                <p className="hover:cursor-pointer">Add a Deadline</p>
                <i className="fa-solid fa-angle-down pt-1 text-sm ml-2 arrow"></i>
              </div>
                <input onChange={(e)=>{setDateInput(e.target.value)}} className="px-2 mb-2 rounded-lg date-input" type="date"></input>
            </div>
          }
          <div className="flex w-3/4 justify-center mt-4 absolute top-[320px] right-12">
            <button onClick={addNewTodoHandler} className="grow mx-2 bg-sky-700 hover:bg-primary">Add</button>
            <button className="grow mx-2 bg-amber-900 hover:bg-red-700" onClick={()=>{setIsAddMode(false)}}>Cancel</button>
          </div>
      </div>
    </div>
  )
}
