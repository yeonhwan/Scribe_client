import UserTodo from "./UserTodo"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import '../../Stylesheets/fonts.css'
import AddNewTodo from "./AddNewTodo"


export default function UserTodoList() {
  const [listData, setlistData] = useState(null);
  const [isAddmode, setIsAddMode] = useState(false);
  const [todoInput, setTodoInput] = useState('');
  const listId = useParams().id
  const fetchList = () => {
    return axios.post(`http://localhost:5862/listboards/${listId}`, {userId : import.meta.env.VITE_USER_ID});
  }

  const updateListData = () => {
    return axios.post(`http://localhost:5862/listboards/${listId}`, {userId : import.meta.env.VITE_USER_ID});

  }

  const addNewTodoData = () => {
    return axios.post(`http://localhost:5862/listboards/${listId}/create/newtodo`, {todo : todoInput});
  }

  const {isLoading, data} = useQuery({queryKey : ['fecthList'], queryFn : fetchList, onSuccess : (data) => {setlistData(data?.data)}, keepPreviousData: true})
  const {mutate : updateList} = useMutation({mutationKey : ['updateListData'], mutationFn : updateListData, onSuccess : (data)=> {setlistData(data?.data)}})
  const {mutate : addNewTodo} = useMutation({mutationKey : ['addNewTodo'], mutationFn : addNewTodoData, onSuccess: updateList})

  const addNewTodoHandler = (e) => {
    e.stopPropagation();
    addNewTodo();
    setIsAddMode(false);
    setTodoInput('');
  }

  if(isLoading) {
    return <h1>Loading...</h1>
  }


  return (
    <div className="flex from-neutral-900 to-stone-900 bg-gradient-to-br w-full h-full">
      <div className="mx-40 pt-12 pb-10 w-3/4">
        <div className="flex">
          <h1 className="text-4xl mb-4 pb-3 border-b-2  border-neutral-700 font-anton tracking-wide">{listData? listData.listname : ''}</h1>
          <i className="pt-3 ml-4 fa-solid fa-pen-to-square hover:text-amber-500 hover:cursor-pointer"></i>
        </div>
        <div className="flex p-4 bg-neutral-800/50 px-8 rounded-xl">
          <ul className="w-full mt-2">
            { 
            listData? listData?.todos.map((todo) => {
              return <UserTodo key={todo._id.toString()} todo={todo} updateListData={updateList}/>
            }) :
            ''
          }
            <li className= "flex max-h-max justify-center mt-6">
              {
                isAddmode?
                <>
                  <AddNewTodo setIsAddMode={setIsAddMode} isAddMode={isAddmode}/>
                  <div onClick={()=>{setIsAddMode(true)}} className="group flex justify-center items-center py-1 rounded-xl px-10 bg-neutral-700 border-neutral-400 hover:cursor-pointer hover:bg-sky-600 invisible">
                    <i className="group ml-2 text-md fa-solid fa-circle-plus group-hover:text-white"></i>
                    <p className="group mx-2 text-sm">Add Todo</p> 
                  </div>
                </>:
                <>
                  <AddNewTodo setIsAddMode={setIsAddMode} isAddMode={isAddmode}/>
                  <div onClick={()=>{setIsAddMode(true)}} className="group flex justify-center items-center py-1 rounded-xl px-10 bg-neutral-700 border-neutral-400 hover:cursor-pointer hover:bg-sky-600 hover:translate-y-[-3px] ease-in-out duration-75">
                    <i className="group ml-2 text-md fa-solid fa-circle-plus text-neutral-500 group-hover:text-white"></i>
                    <p className="group mx-2 text-sm text-neutral-500 group-hover:text-white">Add Todo</p> 
                  </div>
                </>
              }                  
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}