import { useAppStateStore } from "../../store/appStateStore"

export default function NavbarCollapsed() {

const navbarToggle = useAppStateStore((state) => state.navbarToggle);


  return (
    <div className=" bg-neutral-600/30 left h-full w-20 navbar"
        onMouseEnter={() => {navbarToggle(true)}}>
      <div className="mb-8 pt-2 pb-4 px-2 border-b">
        <div className="flex flex-col justify-center items-center">
          <img className="w-8 h-8 rounded-full" src="https://randomuser.me/api/portraits/women/12.jpg"></img>
          <p className="mt-2 text-sm">username</p>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex ml-6 mb-4 w-full">
          <div className="flex justify-center items-center w-8 h-8">
            <i className="fa-solid fa-clipboard-list text-md pt-px text-neutral-400"></i>
          </div>
        </div>
        <div className="flex ml-6 mb-4 w-full">
          <div className="flex justify-center items-center w-8 h-8">
            <i className="fa-solid fa-circle-plus text-sm text-neutral-400"></i>
          </div>
        </div>
        <div className="flex ml-6 mb-4 w-full">
          <div className="flex justify-center items-center w-8 h-8">
            <i className="fa-solid fa-circle-exclamation text-sm text-neutral-400"></i>
          </div>
        </div>
        <div className="flex ml-6 mb-4 w-full">
          <div className="flex justify-center items-center w-8 h-8">
            <i className="fa-regular fa-calendar text-sm text-neutral-400"></i>
          </div>
        </div>
      </div>
    </div>
  )
}
