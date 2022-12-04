import Header from "../Components/Header"
import UserTodoList from "../Components/TodoList/UserTodoList"
import Navbar from "../Components/Navbar/Navbar"

export default function UserListboard() {
  
  return (
    <div className="App bg-gradient-to-b from-zinc-700 to-zinc-800 flex-col text-start w-full h-full">
      <Header/>
      <div className='flex w-full h-[92%]'>
        <Navbar/>
        <UserTodoList/>
      </div>
    </div>
  )
}
