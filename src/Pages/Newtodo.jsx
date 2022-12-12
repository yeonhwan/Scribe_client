import NavbarOpened from '../Components/Navbar/NavbarOpened'
import TodoList from '../Components/TodoList/TodoList'


function Newtodo() {

  return (
    <div className="App bg-gradient-to-b from-zinc-700 to-zinc-800 flex-col text-start w-full h-full">
      <div className='flex w-full h-screen'>
        <NavbarOpened/>
        <TodoList/>
      </div>
    </div>
  )
}

export default Newtodo
