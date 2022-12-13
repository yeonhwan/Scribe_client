import UserTodo from "./UserTodo"
import { useParams } from "react-router-dom"
import { useQuery, useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState, useEffect } from "react"
import '../../Stylesheets/fonts.css'
import AddNewTodo from "./AddNewTodo"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import Taskboard from "./Taskboard"
import { useAppStateStore } from "../../store/appStateStore"

export default function UserTodoList() {
  const [listData, setlistData] = useState(null);
  const [isAddmode, setIsAddMode] = useState(false);
  const [todoInput, setTodoInput] = useState('');
  const [isTaskboardMode, setIsTaskboardMode] = useState(false);
  const [sortBy, setSortBy] = useState('default');
  const [queryOn, setQueryOn] = useState(true);
  const listId = useParams().id
  const fetchList = () => {
    return axios.post(`http://localhost:5862/listboards/${listId}`, {userId : useAppStateStore.getState().userIdToken});
  }

  const updateListData = () => {
    return axios.post(`http://localhost:5862/listboards/${listId}`, {userId : useAppStateStore.getState().userIdToken});

  }

  const addNewTodoData = () => {
    return axios.post(`http://localhost:5862/listboards/${listId}/create/newtodo`, {todo : todoInput});
  }

  const queryOnSuccess = (data) => {
    if(queryOn) {
      setlistData(data?.data);
    }
  }

  const {isLoading, refetch : refetchData} = useQuery({queryKey : ['fecthList'], queryFn : fetchList, onSuccess : queryOnSuccess, keepPreviousData: true, enabled : queryOn})
  const {mutate : updateList} = useMutation({mutationKey : ['updateListData'], mutationFn : updateListData, onSuccess : (data)=> {setlistData(data?.data)}})
  const {mutate : addNewTodo} = useMutation({mutationKey : ['addNewTodo'], mutationFn : addNewTodoData, onSuccess: updateList})

  const addNewTodoHandler = (e) => {
    e.stopPropagation();
    addNewTodo();
    setIsAddMode(false);
    setTodoInput('');
  }

  const handleOnDragEnd = (result) => {
    if(result.destination) {
      const newListData = JSON.parse(JSON.stringify(listData));
      const [reorderedItem] = newListData.todos.splice(result.source.index, 1);
      newListData.todos.splice(result.destination.index, 0, reorderedItem);
      setlistData(newListData);
    }
    return
  }

  useEffect(() => {
    if(sortBy === 'priority') {
      const urgentTodos = listData?.todos.filter((todo) => todo.priority === 1);
      const importantTodos = listData?.todos.filter((todo) => todo.priority === 2);
      const normalTodos = listData?.todos.filter((todo) => todo.priority === 0);
      const newListData = {...listData, todos : [...urgentTodos, ...importantTodos, ...normalTodos]};
      setlistData(newListData);
      setQueryOn(false);
    } else if (sortBy === 'date') {
      console.log('hi!');
      const todosSortedByDate = listData?.todos.slice().sort((a, b) => {
        if (new Date(a.date).getTime() < new Date(b.date).getTime()) {
          if(new Date(a.date).getTime() === 0) {
            return 1;
          } else {
            return -1;
          }
        } else {
          return -1;
        }
      })
      console.log(todosSortedByDate);
      const newListData = {...listData, todos : todosSortedByDate};
      setlistData(newListData);
      setQueryOn(false);
    }
  }, [sortBy])

  const sortHandler = (e) => {
    setSortBy(e.target.value);
    if(e.target.value === 'default') {
      setQueryOn(true);
    } else {
      setQueryOn(false);
    }
  }


  if(isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="absolute z-0 pt-12 pl-60 flex bg-secondary-darker w-full h-full">
      <div className={`ml-32 pt-12 pb-10 w-3/4 smooth-trans duration-300 ${isTaskboardMode? 'min-w-[600px] max-w-[650px]' : 'min-w-[600px] max-w-[900px]'}`}>
        <div className="flex justify-between min-w-[600px] max-w-[850px]">
          <div className="flex">
            <h1 className="text-4xl mb-4 pb-3 border-b-2  border-neutral-700 font-anton tracking-wide">{listData? listData.listname : ''}</h1>
            <i className="pt-3 ml-4 fa-solid fa-pen-to-square hover:text-amber-500 hover:cursor-pointer"></i>
          </div>
          <div className="flex mb-2 items-end">
            <p className="text-xs">sort by</p>
            <select onChange={sortHandler} defaultValue={sortBy} className="text-xs rounded-full pl-2 mx-2 bg-secondary-lighter h-[20px] w-[70px]">
              <option value='date'>date</option>
              <option value='priority'>priority</option>
              <option value='default'>default</option>
            </select>
            <div onClick={()=>{setIsTaskboardMode(!isTaskboardMode)}} className="text-xs px-2 py-1 rounded-full bg-secondary-lighter hover:bg-primary hover:cursor-pointer">Taskboard</div>
          </div>        
        </div>
        {
          sortBy === 'default' ?
          <div className="flex flex-col p-4 pb-8 bg-[#2B2B37] px-8 rounded-lg min-w-[600px] max-w-[850px]">
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="todoList">
              {(provided, snapshot) => 
                <ul className="w-full mt-2" {...provided.droppableProps} ref={provided.innerRef}>
                  { 
                  listData?.todos.map((todo, index) => {
                    return(
                    <Draggable key={todo._id} draggableId={todo._id} index={index}>
                      {(provided) => (
                      <UserTodo todo={todo} refetchData={refetchData} innerRef={provided.innerRef} setQueryOn={setQueryOn} {...provided.draggableProps} {...provided.dragHandleProps}/>
                      )}
                    </Draggable>
                    )
                  })}
                  {provided.placeholder}
                </ul>
              }
            </Droppable>
          </DragDropContext>
        </div>
        : sortBy === 'priority' ? 
        <div className="flex flex-col p-4 pb-8 bg-[#2B2B37] px-8 rounded-lg min-w-[600px] max-w-[850px]">
              <ul className="w-full mt-2">
                {
                  listData?.todos.map((todo, index) => <UserTodo key={todo._id} todo={todo} refetchData={refetchData} setQueryOn={setQueryOn}/>)
                }
              </ul>
        </div> 
      :
      <div className="flex flex-col p-4 pb-8 bg-[#2B2B37] px-8 rounded-lg min-w-[600px] max-w-[850px]">
        <ul className="w-full mt-2">
          {
            listData?.todos.map((todo, index) => <UserTodo key={todo._id} todo={todo} refetchData={refetchData} setQueryOn={setQueryOn}/>)
          }
        </ul>
      </div> 
        }
        <div className= "flex max-h-max ml-8 justify-center mt-6">
          {
            isAddmode?
            <>
              <AddNewTodo refetchData={refetchData} setIsAddMode={setIsAddMode} isAddMode={isAddmode}/>
              <div onClick={()=>{setIsAddMode(true)}} className="group flex justify-center items-center py-1 rounded-xl px-10 bg-transparent border border-primary-lighter hover:cursor-pointer hover:bg-sky-600 invisible">
                <i className="group ml-2 text-md fa-solid fa-circle-plus group-hover:text-white"></i>
                <p className="group mx-2 text-sm">Add a Todo</p> 
              </div>
            </>:
            <>
              <AddNewTodo setIsAddMode={setIsAddMode} isAddMode={isAddmode}/>
              <div onClick={()=>{setIsAddMode(true)}} className="group mr-[10%] flex justify-center items-center py-1 rounded-xl px-10 bg-transparent border border-primary-lighter hover:cursor-pointer hover:bg-primary hover:translate-y-[-3px] ease-in-out duration-75">
                <i className="group ml-2 text-md fa-solid fa-circle-plus text-primary-lighter group-hover:text-white"></i>
                <p className="group mx-2 text-sm text-netural-300 group-hover:text-white">Add a Todo</p> 
              </div>
            </>
          }                  
        </div>
      </div>
      {listData && <Taskboard isTaskboardMode={isTaskboardMode} todos={listData.todos}/>}
    </div>
  )
}