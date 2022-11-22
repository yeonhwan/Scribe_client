import Navbar from './Components/Navbar'
import TodoList from './Components/TodoList'
import Header from './Components/Header'


function App() {

  return (
    <div className="App bg-gradient-to-b from-zinc-700 to-zinc-800 flex-col text-start w-full h-full">
      <Header/>
      <div className='flex w-full h-full'>
        <Navbar/>
        <TodoList/>
      </div>
    </div>
  )
}

export default App
