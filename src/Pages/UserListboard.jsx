import Header from "../Components/Header"
import UserTodoList from "../Components/TodoList/UserTodoList"
import NavbarOpened from '../Components/Navbar/NavbarOpened'

export default function UserListboard() {
  
  return (
    <div className="App bg-gradient-to-b from-zinc-700 to-zinc-800 flex-col text-start w-full h-full">
      <div className='flex w-full h-screen'>
        <NavbarOpened/>
        <UserTodoList/>
      </div>
    </div>
  )
}
