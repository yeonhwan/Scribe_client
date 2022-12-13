import NavbarLogin from '../Components/Navbar/NavbarLogin'
import Listboards from '../Components/Listboard/Listboards'

export default function MyListboards() {
  return (
    <div className="App bg-gradient-to-b from-zinc-700 to-zinc-800 flex-col text-start w-full h-full">
      <div className="flex w-full h-screen">
      <NavbarLogin/>
      <Listboards/>
      </div>
    </div>
  )
}
