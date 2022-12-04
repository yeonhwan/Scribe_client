import Navbar from '../Components/Navbar/Navbar'
import Header from '../Components/Header'
import Listboards from '../Components/Listboard/Listboards'

export default function MyListboards() {
  return (
    <div className="App bg-gradient-to-b from-zinc-700 to-zinc-800 flex-col text-start w-full h-full">
      <Header/>
      <div className="flex w-full h-[92%]">
      <Navbar/>
      <Listboards/>
      </div>
    </div>
  )
}
