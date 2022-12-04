import Navbar from '../Components/Navbar/Navbar'
import TodoList from '../Components/TodoList/TodoList'
import Header from '../Components/Header'


function Newtodo() {

  return (
    <div className="App bg-gradient-to-b from-zinc-700 to-zinc-800 flex-col text-start w-full h-full">
      <Header/>
      <div className='flex w-full h-[92%]'>
        <Navbar/>
        <TodoList/>
      </div>
    </div>
  )
}

export default Newtodo
