import { useAppStateStore } from "../../store/appStateStore"
import { Link } from "react-router-dom"

export default function NavbarOpened() {

  const navbarToggle = useAppStateStore((state) => state.navbarToggle)



  return (
    <div className=" bg-neutral-600/30 left h-full w-[350px] navbar"
         onMouseLeave={() => {navbarToggle(false)}}>
      <div className="mb-8 pt-2 pb-1 px-2 border-b">
        <h1 className="text-md ml-2 mb-2">Welcome, User!</h1>
        <div className="flex">
          <img className="ml-2 w-10 h-10 rounded-full" src="https://randomuser.me/api/portraits/women/12.jpg"></img>
          <div className="flex items-center mb-2">
            <p className="text-xl ml-2">username</p>
            <i className="fa-solid fa-user ml-2 pb-px text-neutral-800"></i>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="w-full mb-4 hover:bg-amber-700 hover:cursor-pointer">
          <div className="flex ml-6 items-center">
            <div className="flex justify-center items-center w-8 h-8">
              <i className="fa-solid fa-clipboard-list text-md pt-px text-neutral-300"></i>
            </div>
            <Link to={`/listboards`} className="ml-2 pt-px px-2">My Listboards</Link>
          </div>
        </div>
        <div className="w-full mb-4 hover:bg-amber-700 hover:cursor-pointer">
          <div className="flex items-center ml-6 w-full">
            <div className="flex justify-center items-center w-8 h-8">
              <i className="fa-solid fa-circle-plus text-sm text-neutral-300"></i>
            </div>
            <Link to={`/newTodo`} className="ml-2 pt-px px-2">Make New Todo</Link>
          </div>
        </div>
        <div className="w-full mb-4 hover:bg-amber-700 hover:cursor-pointer">
          <div className="flex items-center ml-6 w-full">
            <div className="flex justify-center items-center w-8 h-8">
              <i className="fa-solid fa-circle-exclamation text-sm text-neutral-300"></i>
            </div>
            <Link to={`/priorities`} className="ml-2 pt-px px-2">Priorities</Link>
          </div>
        </div>
        <div className="w-full mb-4 hover:bg-amber-700 hover:cursor-pointer">
          <div className="flex items-center ml-6 w-full">
            <div className="flex justify-center items-center w-8 h-8">
              <i className="fa-regular fa-calendar text-sm text-neutral-300"></i>
            </div>
            <Link to={`/date`} className="ml-2 pt-px px-2">Date</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
