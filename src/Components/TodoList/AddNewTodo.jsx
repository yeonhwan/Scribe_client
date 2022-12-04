import { useState } from "react"
import '../../Stylesheets/newTodoAnimation.css'

export default function AddNewTodo({setIsAddMode, isAddMode}) {
  const [todoInput, setTodoInput] = useState('')
  const [dateInput, setDateInput] = useState(new Date(Date.now()));
  const [isDateMode, setIsDateMode] = useState(false);

  const processDateToString = (data) => {
    let year = `${data.getFullYear()}-`;
    let month = data.getMonth();
    if(month < 10) {
      month = `0${month}-`
    } else {
      month = `${month}-`
    }
    let date = data.getDate();
    if(date < 10) {
      date = `0${date}`
    }
    return year.concat(month, date);
  }


  return (
    <div className={isAddMode? 'flex flex-col rounded-lg items-center absolute z-10 top-48 left-50 bg-neutral-800/50 w-[400px] h-[400px] backdrop-blur-md border border-neutral-700 drop-shadow-lg newtodo-form-open'
                             :  'flex flex-col rounded-lg items-center absolute z-10 top-48 left-50 bg-neutral-800/50 w-[400px] h-[400px] backdrop-blur-md border border-neutral-700 drop-shadow-lg newtodo-form'}>
        <h1 className='text-2xl my-6'>Add New Todo</h1>
      <div className='flex flex-col w-3/4'>
        <label htmlFor='todo-name-input'>Type in your Todo</label>
        <input placeholder='New Todo' id='todo-name-input' className='my-2 pl-2' onChange={(e)=>{setTodoInput(e.target.value)}} value={todoInput}></input>
        <label htmlFor='todo-priority'>Select Priority of Todo</label>
        <select defaultValue='None' id='todo-priority' className='mt-2 mb-8'>
          <option>🔥 Urgent</option>
          <option>⚡ Important</option>
          <option>None</option>
        </select>
        {
          isDateMode?
          <div onClick={() => {setIsDateMode(false)}} className="bg-slate-700 flex flex-col justify-center items-center rounded-xl pt-2 hover:cursor-pointer date-container open">
            <div className="flex">
              <p className="hover:cursor-pointer">Add a Deadline</p>
              <i className="fa-solid fa-angle-down pt-2 text-sm ml-2 arrow open"></i>
            </div>
              <input className="px-2 mb-2 rounded-lg date-input open hover:cursor-text" onClick={(e) => {e.stopPropagation()}} type="date" defaultValue={processDateToString(dateInput)} onChange={(e)=>{setDateInput(new Date(e.target.value))}}></input>
          </div> 
          :
          <div onClick={() => {setIsDateMode(true)}} className="flex flex-col pt-2 justify-center items-center rounded-xl bg-slate-700 hover:cursor-pointer date-container">
            <div className="flex">
              <p className="hover:cursor-pointer">Add a Deadline</p>
              <i className="fa-solid fa-angle-down pt-1 text-sm ml-2 arrow"></i>
            </div>
              <input className="px-2 mb-2 rounded-lg date-input" type="date"></input>
           </div>
        }
        <div className="flex w-3/4 justify-center mt-4 absolute top-[320px] right-12">
        <button className="grow mx-2 bg-slate-800 hover:bg-sky-600">Add</button>
        <button className="grow mx-2 bg-amber-900 hover:bg-amber-700" onClick={()=>{setIsAddMode(false)}}>Cancel</button>
        </div>
      </div>
    </div>
  )
}
