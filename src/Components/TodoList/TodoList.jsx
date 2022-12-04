import Todo from "./Todo"
import { useTodoStore } from "../../store/todoStore"
import { useState, useRef } from "react"

export default function TodoList() {

  const [userInput, setUserInput] = useState('');
  const [isAddMode, setIsAddMode] = useState(false);
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const changePosition = useTodoStore((state) => state.changePosition);

  const addToDoHandler = () => {
    addTodo(userInput)
    setUserInput('');
    setIsAddMode(false);
  }

  const inputHandler = (e) => {
    setUserInput(e.target.value)
  }


  // make lists draggable
  const dragItem = useRef(null);
  const dragOverItem = useRef(null);

  const handleDragStart = (e, index) => {
    dragItem.current = index;
  }

  const handleDragEnter = (e, index) => {
    dragOverItem.current = index;
  }

  const handleDragEnd = (e) => {
    changePosition(dragItem.current, dragOverItem.current)
    dragItem.current = null;
    dragOverItem.current = null;
  }

  // make enter key works
  const enterHandler = (e , userInput) => {
    if(e.key === 'Enter') {
      addTodo(userInput);
      setUserInput('');
      setIsAddMode(false);
    }
  }

  return (
    <div className="flex bg-amber-900/10 w-full h-full">
      <div className="ml-28 mr-0 pt-8 pb-10 w-2/3">
        <h1 className="text-3xl mb-2.5 border-b border-neutral-700">Untitled List</h1>
        <div className="flex p-4 bg-neutral-800">
          <ul className="w-full">
            {todos.map((todo) => {
              return (
              <Todo 
              index={todo.index} 
              todo={todo.name} 
              id={todo.id}
              key={todo.id} 
              removeTodo={removeTodo} 
              updateTodo={updateTodo}
              handleDragStart={handleDragStart}
              handleDragEnter={handleDragEnter}
              handleDragEnd={handleDragEnd}
              />
              )
            })}
            <li className={isAddMode === false? "flex border-b-2 mb-2 max-h-max" : "flex items-center mb-2 bg-neutral-600 h-6 max-h-max"}>
              {isAddMode === false ?            
                <i className="ml-2 text-lg fa-solid fa-circle-plus hover:text-sky-600 hover:cursor-pointer"
                onClick={()=>{setIsAddMode(true)}}></i> :                
                <>
                <input id="userInput"
                className="w-11/12 h-6" 
                value={userInput}
                onChange={inputHandler}
                onBlur={addToDoHandler}
                onKeyUp={(e) => {enterHandler(e,userInput)}}>                  
                </input>                
                <i className="ml-2 text-md fa-solid fa-circle-check hover:text-green-500 hover:cursor-pointer"
                onClick={addToDoHandler}></i>
                </>
              }
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}